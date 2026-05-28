import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import styles from './Header.module.css';

/**
 * Sticky marketing header. Brand mark + anchor links to the two on-page
 * sections. No contact CTAs — the landing is informational only.
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
          </nav>

          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
            </nav>
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
