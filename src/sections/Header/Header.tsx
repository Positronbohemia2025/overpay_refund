import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { PATHS } from '../../routes/paths';
import styles from './Header.module.css';

/**
 * Sticky marketing header on the landing page. Brand logo + scroll-anchor nav +
 * phone link + primary CTA. Mobile: hamburger toggles a panel; ESC closes.
 */
export function Header() {
  const { t } = useTranslation('nav');
  const { t: tc } = useTranslation('common');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')} role="banner">
        <div className={styles.inner}>
          <Link to={PATHS.home} className={styles.brand} aria-label={tc('brand')}>
            <BrandMark />
            <span className={styles.brandText}>{tc('brand')}</span>
          </Link>

          <nav className={styles.desktopNav} aria-label={tc('mainLandmark')}>
            <a href="#features" className={styles.navLink}>{t('links.features')}</a>
            <a href="#estimator" className={styles.navLink}>{t('links.estimator')}</a>
            <Link to={PATHS.about} className={styles.navLink}>{t('links.about')}</Link>
            {/* <Link to={PATHS.sampleReport} className={styles.navLink}>{t('links.sample')}</Link> */}
          </nav>

          <div className={styles.actions}>
            <a
              href={`tel:${t('phone').replace(/\s+/g, '')}`}
              className={styles.phone}
              aria-label={t('phoneLabel')}
            >
              <PhoneIcon />
              <span className={styles.phoneText}>{t('phone')}</span>
            </a>
            <Button as="anchor" href="#upload" className={styles.cta}>
              {tc('actions.checkContract')}
            </Button>
          </div>

          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        {menuOpen && (
          <div id={menuId} className={styles.mobilePanel}>
            <nav className={styles.mobileNav} aria-label={tc('mainLandmark')}>
              <a href="#features" className={styles.navLink} onClick={closeMenu}>
                {t('links.features')}
              </a>
              <a href="#estimator" className={styles.navLink} onClick={closeMenu}>
                {t('links.estimator')}
              </a>
              <a href="#upload" className={styles.navLink} onClick={closeMenu}>
                {t('links.upload')}
              </a>
              <Link to={PATHS.about} className={styles.navLink} onClick={closeMenu}>
                {t('links.about')}
              </Link>
              {/* <Link to={PATHS.sampleReport} className={styles.navLink} onClick={closeMenu}>
                {t('links.sample')}
              </Link> */}
            </nav>
            <a
              href={`tel:${t('phone').replace(/\s+/g, '')}`}
              className={styles.phone}
              onClick={closeMenu}
            >
              <PhoneIcon />
              <span className={styles.phoneText}>{t('phone')}</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
}

function BrandMark() {
  return (
    <span className={styles.brandMark} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M5 8h14" />
        <path d="M5 8l-3 7a4 4 0 0 0 8 0z" />
        <path d="M19 8l-3 7a4 4 0 0 0 8 0z" />
      </svg>
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {open ? (
        <>
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </>
      ) : (
        <>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </>
      )}
    </svg>
  );
}
