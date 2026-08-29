type Listener = () => void;

const listeners: Listener[] = [];

const chatWidgetBus = {
  open() {
    listeners.forEach((listener) => listener());
  },
  onOpen(listener: Listener) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    };
  },
};

export default chatWidgetBus;
