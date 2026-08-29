import { useEffect, useState } from 'react';
import ChatService from 'src/modules/chat/chatService';

function ChatSettingsModal({ onClose }: { onClose: () => void }) {
  const [settings, setSettings] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [allowReopen, setAllowReopen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await ChatService.getSettings();
        if (cancelled) return;
        setSettings(data);
        setTitle(data?.chatWidgetTitle || 'FXCC Support');
        setAllowReopen(data?.chatAllowReopenClosed !== false);
      } catch (err) {
        console.error('Load chat settings error:', err);
        if (!cancelled) setError('Could not load settings.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await ChatService.saveSettings({
        ...settings,
        chatWidgetTitle: title.trim() || 'FXCC Support',
        chatAllowReopenClosed: allowReopen,
      });
      onClose();
    } catch (err) {
      console.error('Save chat settings error:', err);
      setError('Could not save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="csm-overlay" onClick={onClose}>
      <div className="csm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="csm-header">
          <h5>Customer Support Settings</h5>
          <button type="button" className="csm-close" onClick={onClose} aria-label="Close">
            <i className="fas fa-times" />
          </button>
        </div>

        {loading ? (
          <div className="csm-loading">
            <i className="fas fa-spinner fa-spin" /> Loading…
          </div>
        ) : (
          <div className="csm-body">
            <label className="csm-field">
              <span className="csm-label">Widget title</span>
              <input
                type="text"
                className="csm-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="FXCC Support"
                maxLength={60}
              />
              <span className="csm-hint">
                Shown at the top of the chat widget on the customer site.
              </span>
            </label>

            <label className="csm-toggle-row">
              <span>
                <span className="csm-label">Allow customers to reactivate closed chats</span>
                <span className="csm-hint">
                  When on, a customer can send a new message into a closed
                  chat and it reopens automatically. When off, they can't
                  reply until an agent reopens it.
                </span>
              </span>
              <span
                className={`csm-switch ${allowReopen ? 'is-on' : ''}`}
                onClick={() => setAllowReopen((v) => !v)}
                role="switch"
                aria-checked={allowReopen}
              >
                <span className="csm-switch-knob" />
              </span>
            </label>

            {error && <div className="csm-error">{error}</div>}
          </div>
        )}

        <div className="csm-footer">
          <button type="button" className="csm-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="csm-btn-primary"
            onClick={handleSave}
            disabled={loading || saving}
          >
            {saving ? <i className="fas fa-spinner fa-spin" /> : 'Save'}
          </button>
        </div>
      </div>

      <style>{`
        .csm-overlay {
          position: fixed; inset: 0; background: rgba(15, 20, 30, 0.45);
          display: flex; align-items: center; justify-content: center; z-index: 10000;
        }
        .csm-modal {
          width: 440px; max-width: calc(100vw - 32px); background: #fff;
          border-radius: 12px; box-shadow: 0 16px 48px rgba(0,0,0,0.25);
          display: flex; flex-direction: column; max-height: calc(100vh - 64px);
        }
        .csm-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 18px; border-bottom: 1px solid #eef0f4;
        }
        .csm-header h5 { margin: 0; font-size: 15px; font-weight: 700; color: #1a1f2b; }
        .csm-close {
          border: none; background: transparent; color: #9aa2b1; width: 28px; height: 28px;
          border-radius: 6px; cursor: pointer; font-size: 13px;
        }
        .csm-close:hover { background: #f4f5f8; color: #1a1f2b; }

        .csm-loading { padding: 40px; text-align: center; color: #9aa2b1; font-size: 13px; }

        .csm-body { padding: 18px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; }

        .csm-field { display: flex; flex-direction: column; gap: 6px; }
        .csm-label { font-size: 13px; font-weight: 600; color: #1a1f2b; }
        .csm-hint { font-size: 11.5px; color: #9aa2b1; line-height: 1.4; }
        .csm-input {
          border: 1px solid #e2e6ee; border-radius: 8px; padding: 9px 12px;
          font-size: 13.5px; outline: none; color: #1a1f2b;
        }
        .csm-input:focus { border-color: #2f6fed; }

        .csm-toggle-row {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; cursor: pointer;
        }
        .csm-toggle-row > span:first-child { display: flex; flex-direction: column; gap: 4px; }

        .csm-switch {
          width: 40px; height: 22px; border-radius: 11px; background: #d7dbe3;
          position: relative; flex-shrink: 0; cursor: pointer; transition: background 0.15s ease; margin-top: 2px;
        }
        .csm-switch.is-on { background: #2f6fed; }
        .csm-switch-knob {
          position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%;
          background: #fff; transition: left 0.15s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }
        .csm-switch.is-on .csm-switch-knob { left: 20px; }

        .csm-error { color: #e5484d; font-size: 12.5px; }

        .csm-footer {
          display: flex; justify-content: flex-end; gap: 8px; padding: 14px 18px;
          border-top: 1px solid #eef0f4;
        }
        .csm-btn-secondary {
          border: 1px solid #e2e6ee; background: #fff; color: #5b6472; border-radius: 8px;
          padding: 8px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
        }
        .csm-btn-secondary:hover { background: #f4f5f8; }
        .csm-btn-primary {
          border: none; background: #2f6fed; color: #fff; border-radius: 8px;
          padding: 8px 18px; font-size: 13px; font-weight: 600; cursor: pointer; min-width: 64px;
        }
        .csm-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

export default ChatSettingsModal;
