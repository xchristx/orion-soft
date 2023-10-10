// scroll bar
import 'simplebar-react/dist/simplebar.min.css';
// editor
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
//
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-image-gallery/styles/css/image-gallery.css';

// ----------------------------------------------------------------------
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <PersistGate persistor={persistor}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </PersistGate>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
