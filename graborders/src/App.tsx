import { ConnectedRouter } from 'connected-react-router';
import {
  configureStore,
  getHistory,
} from 'src/modules/store';
import { Provider } from 'react-redux';
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import jQuery from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import { ThemeProvider } from 'src/modules/theme/themeContext';
import "./theme.css"
import "./App.css"

(window as any).$ = (window as any).jQuery = jQuery;

const store = configureStore();

const App = (props) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ConnectedRouter history={getHistory()}>
          <RoutesComponent />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
