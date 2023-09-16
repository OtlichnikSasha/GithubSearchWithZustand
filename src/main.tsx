import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/assets/styles/main.scss';
import { BrowserRouter } from 'react-router-dom';
import { Modal } from './components/UI/Modal/Modal.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Modal />
    <App />
  </BrowserRouter>,
);
