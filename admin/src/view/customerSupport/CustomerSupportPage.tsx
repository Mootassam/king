import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import ChatService from 'src/modules/chat/chatService';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import { getSocket } from 'src/modules/shared/socket/socketClient';
import Storage from 'src/security/storage';
import ImageModal from 'src/view/shared/modals/ImageModal';
import ChatSettingsModal from './ChatSettingsModal';

const AVATAR_COLORS = [
  '#2f6fed', '#0aa384', '#e8912d', '#8b5cf6', '#e5484d', '#0891b2',
];

const EMOJIS = ['😀', '😊', '👍', '🙏', '✅', '❤️', '🎉', '🤝'];

function avatarColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < (seed || '').length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initialOf(conversation) {
  const label =
    conversation?.customer?.fullName || conversation?.customer?.email || '?';
  return label.trim().charAt(0).toUpperCase();
}

function labelOf(conversation) {
  return (
    conversation?.customer?.email ||
    conversation?.customer?.fullName ||
    'Unknown customer'
  );
}

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

function sortConversations(list) {
  return [...list].sort((a, b) => {
    const aTime = new Date(a.lastMessageAt || a.createdAt).getTime();
    const bTime = new Date(b.lastMessageAt || b.createdAt).getTime();
    return bTime - aTime;
  });
}

function CustomerSupportPage() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const [conversations, setConversations] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [agentOnline, setAgentOnline] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const selectedIdRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const searchDebounce = useRef<any>(null);

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  const selected = useMemo(
    () => conversations.find((c) => c.id === selectedId) || null,
    [conversations, selectedId],
  );

  const loadConversations = async (filter: any = {}) => {
    setLoadingList(true);
    try {
      const result = await ChatService.listConversations(filter);
      setConversations(sortConversations(result.rows || []));
    } catch (error) {
      console.error('List conversations error:', error);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    const socket = getSocket(currentUser.id, true);

    const onMessage = (payload) => {
      const { message, conversation } = payload;

      setConversations((prev) => {
        const exists = prev.some((c) => c.id === conversation.id);
        const next = exists
          ? prev.map((c) => (c.id === conversation.id ? conversation : c))
          : [conversation, ...prev];
        return sortConversations(next);
      });

      if (selectedIdRef.current === conversation.id) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === message.id)) return prev;
          return [...prev, message];
        });
      }
    };

    const onClosed = (payload) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === payload.conversationId ? { ...c, status: 'closed' } : c,
        ),
      );
    };

    const onReopened = (payload) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === payload.conversationId ? { ...c, status: 'open' } : c,
        ),
      );
    };

    const onDeleted = (payload) => {
      setConversations((prev) =>
        prev.filter((c) => c.id !== payload.conversationId),
      );
      if (selectedIdRef.current === payload.conversationId) {
        setSelectedId(null);
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
  }, [currentUser?.id]);

  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoadingMessages(true);
      try {
        const result = await ChatService.listMessages(selectedId, {
          limit: 300,
        });
        if (cancelled) return;
        setMessages(result.rows || []);
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedId ? { ...c, unreadByAdmin: 0 } : c,
          ),
        );
      } catch (error) {
        console.error('List messages error:', error);
      } finally {
        if (!cancelled) setLoadingMessages(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      loadConversations(value ? { search: value } : {});
    }, 300);
  };

  const handleSend = async () => {
    const value = text.trim();
    if (!value || !selected || sending) return;

    setSending(true);
    setText('');
    try {
      const message = await ChatService.sendMessage(selected.id, {
        type: 'text',
        text: value,
      });
      setMessages((prev) =>
        prev.some((m) => m.id === message.id) ? prev : [...prev, message],
      );
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

  const handlePickImage = () => fileInputRef.current?.click();

  const sendImageFile = async (file: File) => {
    if (!file || !selected) return;

    setUploading(true);
    try {
      const uploaded = await FileUploader.upload(file, {
        storage: Storage.values.chatAttachments,
        image: true,
      });

      const message = await ChatService.sendMessage(selected.id, {
        type: 'image',
        attachmentUrl: uploaded.downloadUrl,
      });
      setMessages((prev) =>
        prev.some((m) => m.id === message.id) ? prev : [...prev, message],
      );
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
    if (!selected || selected.status === 'closed') return;
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

  const handleCloseChat = async () => {
    if (!selected) return;
    try {
      const updated = await ChatService.closeConversation(selected.id);
      setConversations((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c)),
      );
    } catch (error) {
      console.error('Close chat error:', error);
    }
  };

  const handleReopenChat = async () => {
    if (!selected) return;
    try {
      const updated = await ChatService.reopenConversation(selected.id);
      setConversations((prev) =>
        prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)),
      );
    } catch (error) {
      console.error('Reopen chat error:', error);
    }
  };

  const handleDeleteChat = async () => {
    if (!selected) return;
    setDeleting(true);
    try {
      await ChatService.deleteConversation(selected.id);
      setConversations((prev) => prev.filter((c) => c.id !== selected.id));
      setSelectedId(null);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Delete chat error:', error);
    } finally {
      setDeleting(false);
    }
  };

  const insertEmoji = (emoji: string) => {
    setText((t) => t + emoji);
    setShowEmoji(false);
  };

  return (
    <div className="cs-page">
      <div className="cs-page-header">
        <div>
          <h4 className="cs-page-title">Customer Support</h4>
          <div className="cs-page-subtitle">
            Manage live chats with your customers
          </div>
        </div>
        <div className="cs-page-header-actions">
          <button
            type="button"
            className={`cs-status-toggle ${agentOnline ? 'is-online' : 'is-offline'}`}
            onClick={() => setAgentOnline((v) => !v)}
          >
            <span className="cs-status-dot" />
            {agentOnline ? 'Online' : 'Offline'}
            <i className="fas fa-chevron-down" />
          </button>
          <button
            type="button"
            className="cs-icon-square"
            aria-label="Settings"
            onClick={() => setShowSettings(true)}
          >
            <i className="fas fa-cog" />
          </button>
        </div>
      </div>

      <div className="cs-panels">
        <div className="cs-list-panel">
          <div className="cs-list-panel-header">
            <div className="cs-list-title">
              Live Chats
              <span className="cs-count-badge">{conversations.length}</span>
            </div>
            <div className="cs-list-actions">
              <i className="fas fa-filter" />
              <i className="fas fa-edit" />
            </div>
          </div>

          <div className="cs-search">
            <i className="fas fa-search" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <div className="cs-conversation-list">
            {loadingList && (
              <div className="cs-empty">
                <i className="fas fa-spinner fa-spin" /> Loading…
              </div>
            )}

            {!loadingList && conversations.length === 0 && (
              <div className="cs-empty">No conversations yet.</div>
            )}

            {conversations.map((conv) => {
              const isOpen = conv.status === 'open';
              const isSelected = conv.id === selectedId;
              return (
                <div
                  key={conv.id}
                  className={`cs-conversation-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedId(conv.id)}
                >
                  <div
                    className="cs-avatar"
                    style={{ background: avatarColor(conv.customer?.id || conv.id) }}
                  >
                    {initialOf(conv)}
                  </div>
                  <div className="cs-conversation-info">
                    <div className="cs-conversation-top">
                      <span className="cs-conversation-name">{labelOf(conv)}</span>
                      <span className="cs-conversation-time-col">
                        <span className="cs-conversation-time">
                          {formatTime(conv.lastMessageAt || conv.createdAt)}
                        </span>
                        {conv.unreadByAdmin > 0 && (
                          <span className="cs-unread-badge">{conv.unreadByAdmin}</span>
                        )}
                      </span>
                    </div>
                    <div className="cs-conversation-bottom">
                      <span className="cs-conversation-preview">
                        {conv.lastMessage || 'No messages yet'}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`cs-status-badge ${
                      !isOpen ? 'closed' : conv.online ? 'online' : 'offline'
                    }`}
                  >
                    {!isOpen ? 'Closed' : conv.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cs-thread-panel">
          {!selected && (
            <div className="cs-thread-empty">
              <i className="fas fa-comments" />
              <p>Select a conversation to start replying</p>
            </div>
          )}

          {selected && (
            <>
              <div className="cs-thread-header">
                <div
                  className="cs-avatar"
                  style={{ background: avatarColor(selected.customer?.id || selected.id) }}
                >
                  {initialOf(selected)}
                </div>
                <div className="cs-thread-header-info">
                  <div className="cs-thread-name">{labelOf(selected)}</div>
                  <div className="cs-thread-session">
                    Session #{String(selected.id).slice(-8)}
                  </div>
                </div>
                <button
                  type="button"
                  className="cs-delete-chat-btn"
                  onClick={() => setShowDeleteConfirm(true)}
                  aria-label="Delete chat history"
                  title="Delete chat history"
                >
                  <i className="fas fa-trash-alt" />
                </button>

                {selected.status === 'open' ? (
                  <button
                    type="button"
                    className="cs-close-chat-btn"
                    onClick={handleCloseChat}
                  >
                    <i className="fas fa-times" /> Close Chat
                  </button>
                ) : (
                  <button
                    type="button"
                    className="cs-reopen-chat-btn"
                    onClick={handleReopenChat}
                  >
                    <i className="fas fa-redo" /> Reopen Chat
                  </button>
                )}
              </div>

              <div className="cs-thread-body" ref={bodyRef}>
                {loadingMessages && (
                  <div className="cs-empty">
                    <i className="fas fa-spinner fa-spin" /> Loading messages…
                  </div>
                )}

                {messages.map((msg) => {
                  const isAdmin = msg.senderType === 'admin';
                  return (
                    <div
                      key={msg.id}
                      className={`cs-message ${isAdmin ? 'is-admin' : 'is-customer'}`}
                    >
                      <div className="cs-message-bubble">
                        {msg.type === 'image' && msg.attachmentUrl ? (
                          <img
                            src={msg.attachmentUrl}
                            alt="attachment"
                            className="cs-message-image"
                            onClick={() => setPreviewImage(msg.attachmentUrl)}
                          />
                        ) : (
                          <span>{msg.text}</span>
                        )}
                      </div>
                      <div className="cs-message-meta">
                        {formatTime(msg.createdAt)}
                        {isAdmin && <i className="fas fa-check-double" />}
                      </div>
                    </div>
                  );
                })}

                {selected.status === 'closed' && (
                  <div className="cs-system-note">This chat has been closed.</div>
                )}
              </div>

              <div className="cs-composer">
                <div className="cs-emoji-wrap">
                  {showEmoji && (
                    <div className="cs-emoji-popover">
                      {EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => insertEmoji(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    className="cs-icon-btn"
                    onClick={() => setShowEmoji((v) => !v)}
                    aria-label="Emoji"
                  >
                    <i className="far fa-smile" />
                  </button>
                </div>

                <button
                  type="button"
                  className="cs-icon-btn"
                  onClick={handlePickImage}
                  disabled={uploading}
                  aria-label="Attach image"
                >
                  {uploading ? (
                    <i className="fas fa-spinner fa-spin" />
                  ) : (
                    <i className="fas fa-paperclip" />
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
                  className="cs-composer-input"
                  placeholder="Type your reply... (you can paste an image)"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  disabled={selected.status === 'closed'}
                />

                <button
                  type="button"
                  className="cs-send-btn"
                  onClick={handleSend}
                  disabled={!text.trim() || sending || selected.status === 'closed'}
                  aria-label="Send"
                >
                  <i className="fas fa-paper-plane" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .cs-page {
          padding: 24px; display: flex; flex-direction: column;
          height: calc(100vh - 61px); box-sizing: border-box; overflow: hidden;
        }

        .cs-page-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px;
        }
        .cs-page-title { margin: 0; font-weight: 700; font-size: 22px; color: #1a1f2b; }
        .cs-page-subtitle { color: #8a93a6; font-size: 13.5px; margin-top: 2px; }
        .cs-page-header-actions { display: flex; align-items: center; gap: 10px; }

        .cs-status-toggle {
          display: flex; align-items: center; gap: 8px;
          border: 1px solid #e2e6ee; background: #fff; border-radius: 20px;
          padding: 7px 14px; font-size: 13px; font-weight: 600; color: #1a1f2b;
          cursor: pointer;
        }
        .cs-status-toggle i { font-size: 10px; color: #8a93a6; margin-left: 2px; }
        .cs-status-dot { width: 8px; height: 8px; border-radius: 50%; background: #ccc; }
        .cs-status-toggle.is-online .cs-status-dot { background: #23c16b; }
        .cs-status-toggle.is-offline .cs-status-dot { background: #b0b6c1; }

        .cs-icon-square {
          width: 34px; height: 34px; border-radius: 8px; border: 1px solid #e2e6ee;
          background: #fff; color: #5b6472; display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }

        .cs-panels {
          flex: 1; display: flex; gap: 16px; min-height: 0;
        }

        .cs-list-panel {
          width: 320px; flex-shrink: 0; background: #fff; border: 1px solid #e9ecf2;
          border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; min-height: 0;
        }
        .cs-list-panel-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; border-bottom: 1px solid #eef0f4;
        }
        .cs-list-title { font-weight: 700; font-size: 15px; color: #1a1f2b; display: flex; align-items: center; gap: 8px; }
        .cs-count-badge {
          background: #eaf1ff; color: #2f6fed; font-size: 11px; font-weight: 700;
          padding: 2px 8px; border-radius: 10px;
        }
        .cs-list-actions { display: flex; gap: 12px; color: #9aa2b1; font-size: 14px; }
        .cs-list-actions i { cursor: pointer; }

        .cs-search {
          margin: 12px 14px; display: flex; align-items: center; gap: 8px;
          background: #f4f5f8; border-radius: 8px; padding: 8px 10px;
        }
        .cs-search i { color: #9aa2b1; font-size: 12px; }
        .cs-search input {
          border: none; background: transparent; outline: none; font-size: 13px; flex: 1; color: #1a1f2b;
        }

        .cs-conversation-list { flex: 1; overflow-y: auto; min-height: 0; }
        .cs-empty { padding: 24px; text-align: center; color: #9aa2b1; font-size: 13px; }

        .cs-conversation-item {
          display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px;
          cursor: pointer; border-bottom: 1px solid #f2f3f7; position: relative;
        }
        .cs-conversation-item:hover { background: #f8f9fc; }
        .cs-conversation-item.is-selected { background: #eef4ff; }

        .cs-avatar {
          width: 38px; height: 38px; border-radius: 50%; color: #fff; font-weight: 700;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px;
        }

        .cs-conversation-info { flex: 1; min-width: 0; }
        .cs-conversation-top { display: flex; justify-content: space-between; gap: 6px; }
        .cs-conversation-name {
          font-size: 13.5px; font-weight: 600; color: #1a1f2b;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cs-conversation-time-col {
          display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0;
        }
        .cs-conversation-time { font-size: 11px; color: #9aa2b1; flex-shrink: 0; }
        .cs-conversation-bottom {
          display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-top: 2px;
          padding-right: 76px;
        }
        .cs-conversation-preview {
          font-size: 12px; color: #8a93a6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cs-unread-badge {
          background: #2f6fed; color: #fff; font-size: 10px; font-weight: 700;
          min-width: 16px; height: 16px; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 0 4px;
        }

        .cs-status-badge {
          position: absolute; right: 14px; bottom: 12px; font-size: 10.5px; font-weight: 600;
          padding: 2px 8px; border-radius: 10px;
        }
        .cs-status-badge.online { background: #e6f9ee; color: #23c16b; }
        .cs-status-badge.offline { background: #f2f3f7; color: #9aa2b1; }
        .cs-status-badge.closed { background: #f2f3f7; color: #9aa2b1; }

        .cs-thread-panel {
          flex: 1; background: #fff; border: 1px solid #e9ecf2; border-radius: 12px;
          display: flex; flex-direction: column; overflow: hidden; min-width: 0; min-height: 0;
        }

        .cs-thread-empty {
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: #b0b6c1;
        }
        .cs-thread-empty i { font-size: 40px; margin-bottom: 10px; }

        .cs-thread-header {
          display: flex; align-items: center; gap: 10px; padding: 14px 18px;
          border-bottom: 1px solid #eef0f4;
        }
        .cs-thread-header-info { flex: 1; min-width: 0; }
        .cs-thread-name { font-weight: 700; font-size: 14px; color: #1a1f2b; }
        .cs-thread-session { font-size: 11.5px; color: #9aa2b1; margin-top: 2px; }

        .cs-close-chat-btn {
          border: 1px solid #f0c3c3; background: #fff; color: #e5484d; border-radius: 8px;
          padding: 7px 14px; font-size: 12.5px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; gap: 6px;
        }
        .cs-close-chat-btn:hover { background: #fff5f5; }

        .cs-reopen-chat-btn {
          border: 1px solid #b7d4ff; background: #fff; color: #2f6fed; border-radius: 8px;
          padding: 7px 14px; font-size: 12.5px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; gap: 6px;
        }
        .cs-reopen-chat-btn:hover { background: #eef4ff; }

        .cs-delete-chat-btn {
          width: 34px; height: 34px; flex-shrink: 0; border: 1px solid #e2e6ee; background: #fff;
          color: #9aa2b1; border-radius: 8px; cursor: pointer; display: flex; align-items: center;
          justify-content: center; font-size: 13px;
        }
        .cs-delete-chat-btn:hover { background: #fff5f5; color: #e5484d; border-color: #f0c3c3; }

        .cs-thread-body {
          flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 12px;
          background: #fafbfd; min-height: 0;
        }

        .cs-message { max-width: 62%; display: flex; flex-direction: column; }
        .cs-message.is-admin { align-self: flex-end; align-items: flex-end; }
        .cs-message.is-customer { align-self: flex-start; align-items: flex-start; }

        .cs-message-bubble {
          padding: 10px 14px; border-radius: 12px; font-size: 13.5px; line-height: 1.45;
          background: #eef0f4; color: #1a1f2b; word-break: break-word; white-space: pre-wrap;
        }
        .cs-message.is-admin .cs-message-bubble {
          background: #2f6fed; color: #fff; border-bottom-right-radius: 4px;
        }
        .cs-message.is-customer .cs-message-bubble { border-bottom-left-radius: 4px; }

        .cs-message-image { max-width: 220px; max-height: 220px; border-radius: 8px; display: block; cursor: pointer; transition: opacity 0.15s; }
        .cs-message-image:hover { opacity: 0.85; }

        .cs-message-meta {
          font-size: 10.5px; color: #b0b6c1; margin-top: 4px; display: flex; align-items: center; gap: 5px;
        }

        .cs-system-note { text-align: center; color: #b0b6c1; font-size: 12px; padding: 6px 0; }

        .cs-composer {
          display: flex; align-items: center; gap: 6px; padding: 12px 16px;
          border-top: 1px solid #eef0f4; background: #fff; position: relative;
        }
        .cs-icon-btn {
          width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent;
          color: #8a93a6; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 15px;
        }
        .cs-icon-btn:hover { background: #f4f5f8; color: #2f6fed; }
        .cs-icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .cs-emoji-wrap { position: relative; }
        .cs-emoji-popover {
          position: absolute; bottom: 42px; left: 0; background: #fff; border: 1px solid #e9ecf2;
          border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); padding: 8px; display: flex; gap: 4px;
        }
        .cs-emoji-popover button {
          border: none; background: transparent; font-size: 18px; cursor: pointer; padding: 4px;
        }
        .cs-emoji-popover button:hover { background: #f4f5f8; border-radius: 6px; }

        .cs-composer-input {
          flex: 1; border: 1px solid #e2e6ee; border-radius: 20px; padding: 9px 16px;
          font-size: 13.5px; outline: none; color: #1a1f2b;
        }
        .cs-composer-input:focus { border-color: #2f6fed; }
        .cs-composer-input:disabled { background: #f4f5f8; }

        .cs-send-btn {
          width: 36px; height: 36px; border-radius: 50%; background: #2f6fed; color: #fff;
          border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px;
          flex-shrink: 0;
        }
        .cs-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        @media (max-width: 900px) {
          .cs-panels { flex-direction: column; height: auto; }
          .cs-list-panel { width: 100%; }
        }
      `}</style>

      {showSettings && (
        <ChatSettingsModal onClose={() => setShowSettings(false)} />
      )}

      {previewImage && (
        <ImageModal
          src={previewImage}
          alt="attachment"
          onClose={() => setPreviewImage(null)}
        />
      )}

      {showDeleteConfirm && selected && (
        <div className="cs-confirm-overlay" onClick={() => !deleting && setShowDeleteConfirm(false)}>
          <div className="cs-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cs-confirm-icon">
              <i className="fas fa-trash-alt" />
            </div>
            <h5>Delete this chat?</h5>
            <p>
              This permanently deletes the entire message history with{' '}
              <strong>{labelOf(selected)}</strong>. This can't be undone.
            </p>
            <div className="cs-confirm-actions">
              <button
                type="button"
                className="cs-confirm-cancel"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="cs-confirm-delete"
                onClick={handleDeleteChat}
                disabled={deleting}
              >
                {deleting ? <i className="fas fa-spinner fa-spin" /> : 'Delete Chat'}
              </button>
            </div>
          </div>

          <style>{`
            .cs-confirm-overlay {
              position: fixed; inset: 0; background: rgba(15, 20, 30, 0.45);
              display: flex; align-items: center; justify-content: center; z-index: 10001;
            }
            .cs-confirm-modal {
              width: 380px; max-width: calc(100vw - 32px); background: #fff; border-radius: 12px;
              box-shadow: 0 16px 48px rgba(0,0,0,0.25); padding: 24px; text-align: center;
            }
            .cs-confirm-icon {
              width: 48px; height: 48px; border-radius: 50%; background: #fff5f5; color: #e5484d;
              display: flex; align-items: center; justify-content: center; font-size: 18px;
              margin: 0 auto 14px;
            }
            .cs-confirm-modal h5 { margin: 0 0 8px; font-size: 15px; font-weight: 700; color: #1a1f2b; }
            .cs-confirm-modal p { margin: 0 0 20px; font-size: 13px; color: #5b6472; line-height: 1.5; }
            .cs-confirm-actions { display: flex; gap: 8px; }
            .cs-confirm-cancel {
              flex: 1; border: 1px solid #e2e6ee; background: #fff; color: #5b6472; border-radius: 8px;
              padding: 10px; font-size: 13px; font-weight: 600; cursor: pointer;
            }
            .cs-confirm-cancel:hover { background: #f4f5f8; }
            .cs-confirm-delete {
              flex: 1; border: none; background: #e5484d; color: #fff; border-radius: 8px;
              padding: 10px; font-size: 13px; font-weight: 700; cursor: pointer;
            }
            .cs-confirm-delete:hover { background: #cc3f44; }
            .cs-confirm-cancel:disabled, .cs-confirm-delete:disabled { opacity: 0.6; cursor: not-allowed; }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default CustomerSupportPage;
