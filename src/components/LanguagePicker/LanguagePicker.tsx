import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { getPublishedLocales, storeLocale } from '../../i18n/locales';
import styles from './LanguagePicker.module.css';

/**
 * Language picker (T021 / FR-043, FR-054). Lists only native-speaker-reviewed
 * locales (getPublishedLocales) by endonym. A native <select> keeps it keyboard-
 * and screen-reader-operable with no custom widget. Romanian is the only
 * published locale at launch; the control is the seam for adding more.
 */
export function LanguagePicker() {
  const { t, i18n } = useTranslation('common');
  const locales = getPublishedLocales();
  const selectId = useId();

  const onChange = (code: string) => {
    void i18n.changeLanguage(code);
    storeLocale(code);
    document.documentElement.lang = code;
  };

  return (
    <div className={styles.picker}>
      <label htmlFor={selectId} className={styles.label}>
        {t('language.label')}
      </label>
      <select
        id={selectId}
        className={styles.select}
        value={i18n.language}
        onChange={(e) => onChange(e.target.value)}
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.label}
          </option>
        ))}
      </select>
    </div>
  );
}
