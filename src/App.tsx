import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SkipLink } from './components/SkipLink/SkipLink';
import { LiveRegionProvider } from './components/LiveRegion/LiveRegion';
import { LanguagePicker } from './components/LanguagePicker/LanguagePicker';
import Home from './routes/Home';
import SampleReport from './routes/SampleReport';
import About from './routes/About';
import DataHandling from './routes/DataHandling';
import Methodology from './routes/Methodology';
import Terms from './routes/Terms';
import Accessibility from './routes/Accessibility';
import styles from './App.module.css';

/**
 * App shell (T014): SkipLink + LiveRegion provider wrap a router whose layout
 * gives every route a quiet header (brand + language) and a main landmark.
 * The SiteFooter is part of the Home composition (T037, FR-001), not the shell.
 */
function Layout() {
  const { t } = useTranslation('common');
  return (
    <>
      <SkipLink />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand}>
            {t('brand')}
          </Link>
          <LanguagePicker />
        </div>
      </header>
      <main id="main-content" aria-label={t('mainLandmark')}>
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return (
    <LiveRegionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="raport-model" element={<SampleReport />} />
            <Route path="despre" element={<About />} />
            <Route path="date" element={<DataHandling />} />
            <Route path="metodologie" element={<Methodology />} />
            <Route path="termeni" element={<Terms />} />
            <Route path="accesibilitate" element={<Accessibility />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LiveRegionProvider>
  );
}
