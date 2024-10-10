import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './assets/css/index.css';
import { Provider } from 'react-redux';
import { store } from './toolkits/store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
