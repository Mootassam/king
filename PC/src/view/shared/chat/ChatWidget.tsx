import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import ChatService from 'src/modules/chat/chatService';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import { getSocket } from 'src/modules/shared/socket/socketClient';
import Storage from 'src/security/storage';
import chatWidgetBus from './chatWidgetBus';

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

function ChatWidget() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const signedIn = useSelector(authSelectors.selectSignedIn);

  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [widgetTitle, setWidgetTitle] = useState(DEFAULT_TITLE);
  const [allowReopen, setAllowReopen] = useState(true);

  const conversationRef = useRef<any>(null);
  const openRef = useRef(false);
  const bootstrappedRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const addMessage = (msg) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === msg.id)) return prev;
      return [...prev, msg];
    });
  };

  // Connect the socket as soon as the customer is signed in, so live
  // updates work the moment a conversation exists (created on first open).
  useEffect(() => {
    if (!signedIn || !currentUser?.id) return;

    const socket = getSocket(currentUser.id, false);

    const onMessage = (payload) => {
      const currentConv = conversationRef.current;
      if (!currentConv || payload.conversation?.id !== currentConv.id) return;

      addMessage(payload.message);
      setConversation(payload.conversation);

      if (payload.message.senderType === 'admin' && !openRef.current) {
        setUnread((n) => n + 1);
      }
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
      // An agent wiped the history — start clean with a brand new conversation.
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
      socket?.off('chat:message', onMessage);
      socket?.off('chat:closed', onClosed);
      socket?.off('chat:reopened', onReopened);
      socket?.off('chat:deleted', onDeleted);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn, currentUser?.id]);

  // Get/create the conversation + load history the moment the customer
  // actually opens the widget — this is also when the backend logs the
  // greeting as a real message, so admins see the chat was opened even if
  // the customer never types anything.
  useEffect(() => {
    if (!open || !signedIn || !currentUser?.id || bootstrappedRef.current) {
      return;
    }
    bootstrappedRef.current = true;

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
        bootstrappedRef.current = false;
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, signedIn, currentUser?.id]);

  // Open the widget when navigated to /online-service.
  useEffect(() => {
    return chatWidgetBus.onOpen(() => setOpen(true));
  }, []);

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
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

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

  // Paste an image straight from the clipboard (screenshot, copied image, etc.)
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
    <div className="kc-chat-root">
      {!open && (
        <button
          type="button"
          className="kc-chat-launcher"
          onClick={() => setOpen(true)}
          aria-label="Open live chat"
        >
          <i className="fas fa-comment-dots" />
          {unread > 0 && <span className="kc-chat-badge">{unread}</span>}
        </button>
      )}

      {open && (
        <div className="kc-chat-panel">
          <div className="kc-chat-header">
            <div className="kc-chat-header-icon">
              <i className="fas fa-headset" />
            </div>
            <div className="kc-chat-header-text">
              <div className="kc-chat-title">{widgetTitle}</div>
            </div>
            <div className="kc-chat-header-actions">
              <button
                type="button"
                className="kc-chat-icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Minimize"
              >
                <i className="fas fa-minus" />
              </button>
              <button
                type="button"
                className="kc-chat-icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>

          <div className="kc-chat-body" ref={bodyRef}>
            {loading && (
              <div className="kc-chat-loading">
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
                      ? 'kc-chat-message kc-chat-message-admin'
                      : 'kc-chat-message kc-chat-message-customer'
                  }
                >
                  {isAdmin && (
                    <div className="kc-chat-avatar">
                      <i className="fas fa-headset" />
                    </div>
                  )}
                  <div className="kc-chat-bubble">
                    {msg.type === 'image' && msg.attachmentUrl ? (
                      <img
                        src={msg.attachmentUrl}
                        alt="attachment"
                        className="kc-chat-image"
                      />
                    ) : (
                      <span>{msg.text}</span>
                    )}
                    <div className="kc-chat-time">
                      {formatTime(msg.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}

            {isClosed && (
              <div className="kc-chat-system">This chat has been closed.</div>
            )}
          </div>

          <div className="kc-chat-composer">
            <button
              type="button"
              className="kc-chat-icon-btn"
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
              className="kc-chat-input"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              disabled={!conversation || composerDisabled}
            />
            <button
              type="button"
              className="kc-chat-send-btn"
              onClick={handleSend}
              disabled={!text.trim() || sending || !conversation || composerDisabled}
              aria-label="Send message"
            >
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .kc-chat-root {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 9999;
          font-family: inherit;
        }

        .kc-chat-launcher {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #0064FA;
          border: none;
          color: #fff;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 100, 250, 0.45);
          position: relative;
          transition: transform 0.15s ease;
        }
        .kc-chat-launcher:hover { transform: scale(1.06); }

        .kc-chat-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ff3b3b;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
          border: 2px solid #fff;
        }

        .kc-chat-panel {
          width: 340px;
          max-width: calc(100vw - 24px);
          height: 480px;
          max-height: calc(100vh - 100px);
          background: #161b26;
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.45);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .kc-chat-header {
          background: linear-gradient(135deg, #0064FA, #2f7bff);
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .kc-chat-header-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 15px;
          flex-shrink: 0;
        }
        .kc-chat-header-text { flex: 1; min-width: 0; }
        .kc-chat-title { color: #fff; font-weight: 700; font-size: 14px; line-height: 1.2; }
        .kc-chat-subtitle { color: rgba(255,255,255,0.85); font-size: 11.5px; margin-top: 2px; }
        .kc-chat-header-actions { display: flex; gap: 4px; }
        .kc-chat-icon-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.9);
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 13px;
        }
        .kc-chat-header .kc-chat-icon-btn:hover { background: rgba(255,255,255,0.15); }

        .kc-chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #11151f;
        }

        .kc-chat-loading, .kc-chat-system {
          text-align: center;
          color: #6b7383;
          font-size: 12px;
          padding: 6px 0;
        }

        .kc-chat-message {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          max-width: 88%;
        }
        .kc-chat-message-admin { align-self: flex-start; }
        .kc-chat-message-customer { align-self: flex-end; flex-direction: row-reverse; }

        .kc-chat-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #0064FA;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
        }

        .kc-chat-bubble {
          background: #232a3a;
          color: #e8ebf1;
          padding: 9px 12px;
          border-radius: 12px;
          font-size: 13.5px;
          line-height: 1.4;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .kc-chat-message-admin .kc-chat-bubble { border-top-left-radius: 4px; }
        .kc-chat-message-customer .kc-chat-bubble {
          background: #0064FA;
          color: #fff;
          border-top-right-radius: 4px;
        }

        .kc-chat-time {
          font-size: 10px;
          opacity: 0.6;
          margin-top: 4px;
          text-align: right;
        }

        .kc-chat-image {
          max-width: 180px;
          max-height: 180px;
          border-radius: 8px;
          display: block;
        }

        .kc-chat-composer {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 10px;
          background: #161b26;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .kc-chat-composer .kc-chat-icon-btn { color: #8a93a6; font-size: 16px; width: 30px; height: 30px; }
        .kc-chat-composer .kc-chat-icon-btn:hover { color: #fff; }
        .kc-chat-composer .kc-chat-icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .kc-chat-input {
          flex: 1;
          background: #0e1219;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 9px 14px;
          color: #fff;
          font-size: 13px;
          outline: none;
        }
        .kc-chat-input::placeholder { color: #6b7383; }
        .kc-chat-input:disabled { opacity: 0.5; }

        .kc-chat-send-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #0064FA;
          border: none;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 13px;
          flex-shrink: 0;
        }
        .kc-chat-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        @media (max-width: 420px) {
          .kc-chat-root { right: 10px; bottom: 10px; }
          .kc-chat-panel { width: calc(100vw - 20px); height: calc(100vh - 140px); }
        }
      `}</style>
    </div>
  );
}

export default ChatWidget;
