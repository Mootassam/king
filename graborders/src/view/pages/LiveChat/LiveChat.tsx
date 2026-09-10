import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import ChatService from 'src/modules/chat/chatService';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import { getSocket } from 'src/modules/shared/socket/socketClient';
import Storage from 'src/security/storage';

const DEFAULT_TITLE = 'FXCC Support';

function formatTime(date) {
  if (!date) return '';
  try {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

// Full-page live chat — replaces the old floating widget for grabOrders.
// Reached via the "Online Service" menu item, with a back button to leave.
function LiveChat() {
  const history = useHistory();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const signedIn = useSelector(authSelectors.selectSignedIn);

  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [widgetTitle, setWidgetTitle] = useState(DEFAULT_TITLE);
  const [allowReopen, setAllowReopen] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const conversationRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  const addMessage = (msg) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === msg.id)) return prev;
      return [...prev, msg];
    });
  };

  const goBack = () => history.goBack();

  // Get/create the conversation + load history + connect the socket the
  // moment this page opens — this also logs the greeting as a real message,
  // so admins see the chat was opened even if the customer never types.
  useEffect(() => {
    if (!signedIn || !currentUser?.id) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const conv = await ChatService.myConversation();
        if (cancelled) return;
        setConversation(conv);

        const history = await ChatService.listMessages(conv.id, {
          limit: 200,
        });
        if (cancelled) return;
        setMessages(history.rows || []);
      } catch (error) {
        console.error('Chat bootstrap error:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const socket = getSocket(currentUser.id, false);

    const onMessage = (payload) => {
      const currentConv = conversationRef.current;
      if (!currentConv || payload.conversation?.id !== currentConv.id) return;
      addMessage(payload.message);
      setConversation(payload.conversation);
    };

    const onClosed = (payload) => {
      const currentConv = conversationRef.current;
      if (!currentConv || payload.conversationId !== currentConv.id) return;
      setConversation((prev) => (prev ? { ...prev, status: 'closed' } : prev));
    };

    const onReopened = (payload) => {
      const currentConv = conversationRef.current;
      if (!currentConv || payload.conversationId !== currentConv.id) return;
      setConversation((prev) => (prev ? { ...prev, status: 'open' } : prev));
    };

    const onDeleted = async (payload) => {
      const currentConv = conversationRef.current;
      if (!currentConv || payload.conversationId !== currentConv.id) return;
      setMessages([]);
      try {
        const conv = await ChatService.myConversation();
        setConversation(conv);
      } catch (error) {
        console.error('Recreate conversation error:', error);
        setConversation(null);
      }
    };

    socket?.on('chat:message', onMessage);
    socket?.on('chat:closed', onClosed);
    socket?.on('chat:reopened', onReopened);
    socket?.on('chat:deleted', onDeleted);

    return () => {
      cancelled = true;
      socket?.off('chat:message', onMessage);
      socket?.off('chat:closed', onClosed);
      socket?.off('chat:reopened', onReopened);
      socket?.off('chat:deleted', onDeleted);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn, currentUser?.id]);

  // Pull the admin-configurable widget title / reopen policy.
  useEffect(() => {
    if (!signedIn) return;

    let cancelled = false;

    (async () => {
      try {
        const settings = await ChatService.getSettings();
        if (cancelled) return;
        setWidgetTitle(settings?.chatWidgetTitle || DEFAULT_TITLE);
        setAllowReopen(settings?.chatAllowReopenClosed !== false);
      } catch (error) {
        console.error('Load chat settings error:', error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [signedIn]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const value = text.trim();
    if (!value || !conversation || sending) return;

    setSending(true);
    setText('');
    try {
      const message = await ChatService.sendMessage(conversation.id, {
        type: 'text',
        text: value,
      });
      addMessage(message);
    } catch (error) {
      console.error('Send message error:', error);
      setText(value);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const sendImageFile = async (file) => {
    if (!file || !conversation) return;

    setUploading(true);
    try {
      const uploaded = await FileUploader.upload(file, {
        storage: Storage.values.chatAttachments,
        image: true,
      });

      const message = await ChatService.sendMessage(conversation.id, {
        type: 'image',
        attachmentUrl: uploaded.downloadUrl,
      });
      addMessage(message);
    } catch (error) {
      console.error('Image upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) await sendImageFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaste = (e) => {
    if (!conversation || (conversation.status === 'closed' && !allowReopen)) return;
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          sendImageFile(file);
        }
        break;
      }
    }
  };

  if (!signedIn) return null;

  const isClosed = conversation?.status === 'closed';
  const composerDisabled = isClosed && !allowReopen;

  return (
    <div className="svc-page">
      <div className="svc-header">
        <div className="svc-header-left" onClick={goBack}>
          <i className="fas fa-arrow-left" />
        </div>
        <div className="svc-header-title">{widgetTitle}</div>
        <div className="svc-header-right" />
      </div>

      <div className="svc-body" ref={bodyRef}>
        {loading && (
          <div className="svc-loading">
            <i className="fas fa-spinner fa-spin" /> Loading conversation…
          </div>
        )}

        {messages.map((msg) => {
          const isAdmin = msg.senderType === 'admin';
          return (
            <div
              key={msg.id}
              className={
                isAdmin
                  ? 'svc-message svc-message-admin'
                  : 'svc-message svc-message-customer'
              }
            >
              {isAdmin && (
                <div className="svc-avatar">
                  <i className="fas fa-headset" />
                </div>
              )}
              <div className="svc-bubble">
                {msg.type === 'image' && msg.attachmentUrl ? (
                  <img
                    src={msg.attachmentUrl}
                    alt="attachment"
                    className="svc-image"
                    onClick={() => setPreviewImage(msg.attachmentUrl)}
                  />
                ) : (
                  <span>{msg.text}</span>
                )}
                <div className="svc-time">{formatTime(msg.createdAt)}</div>
              </div>
            </div>
          );
        })}

        {isClosed && (
          <div className="svc-system">This chat has been closed.</div>
        )}
      </div>

      <div className="svc-composer">
        <button
          type="button"
          className="svc-icon-btn"
          onClick={handlePickImage}
          disabled={uploading || !conversation || composerDisabled}
          aria-label="Attach image"
        >
          {uploading ? (
            <i className="fas fa-spinner fa-spin" />
          ) : (
            <i className="fas fa-image" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <input
          type="text"
          className="svc-input"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          disabled={!conversation || composerDisabled}
        />
        <button
          type="button"
          className="svc-send-btn"
          onClick={handleSend}
          disabled={!text.trim() || sending || !conversation || composerDisabled}
          aria-label="Send message"
        >
          <i className="fas fa-paper-plane" />
        </button>
      </div>

      {previewImage && (
        <div
          className="svc-image-lightbox"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            className="svc-image-lightbox-close"
            onClick={() => setPreviewImage(null)}
            aria-label="Close"
          >
            <i className="fas fa-times" />
          </button>
          <img src={previewImage} alt="attachment" />
        </div>
      )}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .svc-page {
          max-width: 400px;
          margin: 0 auto;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #11151f;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .svc-header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .svc-header-left, .svc-header-right {
          width: 24px;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
        }
        .svc-header-title {
          color: #fff;
          font-size: 17px;
          font-weight: 600;
        }

        .svc-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .svc-loading, .svc-system {
          text-align: center;
          color: var(--kt-text-muted);
          font-size: 12px;
          padding: 6px 0;
        }

        .svc-message {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          max-width: 80%;
        }
        .svc-message-admin { align-self: flex-start; }
        .svc-message-customer { align-self: flex-end; flex-direction: row-reverse; }

        .svc-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #106cf5;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }

        .svc-bubble {
          background: #232a3a;
          color: #e8ebf1;
          padding: 10px 13px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.45;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .svc-message-admin .svc-bubble { border-top-left-radius: 4px; }
        .svc-message-customer .svc-bubble {
          background: #106cf5;
          color: #fff;
          border-top-right-radius: 4px;
        }

        .svc-time {
          font-size: 10px;
          opacity: 0.6;
          margin-top: 4px;
          text-align: right;
        }

        .svc-image {
          max-width: 200px;
          max-height: 200px;
          border-radius: 8px;
          display: block;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .svc-image:hover {
          opacity: 0.85;
        }

        .svc-image-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100000;
          padding: 24px;
          box-sizing: border-box;
          cursor: zoom-out;
        }
        .svc-image-lightbox img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 4px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        .svc-image-lightbox-close {
          position: absolute;
          top: 20px;
          right: 24px;
          background: rgba(255, 255, 255, 0.12);
          border: none;
          color: #fff;
          font-size: 18px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }
        .svc-image-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.24);
        }

        .svc-composer {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background: #161b26;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .svc-icon-btn {
          background: transparent;
          border: none;
          color: var(--kt-text-muted);
          width: 32px;
          height: 32px;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .svc-icon-btn:hover { color: #fff; }
        .svc-icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .svc-input {
          flex: 1;
          background: #0e1219;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 11px 16px;
          color: #fff;
          font-size: 14px;
          outline: none;
        }
        .svc-input::placeholder { color: var(--kt-text-muted); }
        .svc-input:disabled { opacity: 0.5; }

        .svc-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #106cf5;
          border: none;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          flex-shrink: 0;
        }
        .svc-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

export default LiveChat;
