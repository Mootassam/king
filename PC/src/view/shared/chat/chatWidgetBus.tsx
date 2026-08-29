type Listener = () => void;

const listeners: Listener[] = [];
let pending = false;

const chatWidgetBus = {
  open() {
    pending = true;
    listeners.forEach((listener) => listener());
  },
  onOpen(listener: Listener) {
    listeners.push(listener);
    if (pending) {
      pending = false;
      listener();
    }
    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    };
  },
};

export default chatWidgetBus;
