import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/fonts.css';
import './styles/global.css';
import App from './App';
import { readStoredLocale } from './i18n/locales';
import i18n from './i18n';

// Honor a stored language preference before first paint (never used for tracking).
const stored = readStoredLocale();
if (stored && stored !== i18n.language) {
  void i18n.changeLanguage(stored);
  document.documentElement.lang = stored;
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
