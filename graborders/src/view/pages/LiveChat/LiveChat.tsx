import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import chatWidgetBus from 'src/view/shared/chat/chatWidgetBus';

// The live chat is a persistent floating widget mounted in LayoutPage.
// This route just opens it and sends the user back to the dashboard.
function LiveChat() {
  const history = useHistory();

  useEffect(() => {
    chatWidgetBus.open();
    history.replace('/');
  }, [history]);

  return null;
}

export default LiveChat;
