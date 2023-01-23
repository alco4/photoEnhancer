import ReactDOM from 'react-dom/client';
import { DarkModeProvider } from './context/DarkModeProvider'
import './index.scss';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>

);