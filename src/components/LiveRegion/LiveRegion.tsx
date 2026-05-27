import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './LiveRegion.module.css';

/**
 * App-level polite aria-live announcer (T020 / FR-039, SC-008).
 * Components call announce() to speak status changes (e.g. upload progress) to
 * assistive technology without moving focus. A single shared region avoids
 * multiple competing live regions.
 */
interface LiveRegionApi {
  announce: (message: string) => void;
}

const LiveRegionContext = createContext<LiveRegionApi | null>(null);

export function LiveRegionProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = useCallback((next: string) => {
    // Reset to empty first so identical consecutive messages are re-announced.
    setMessage('');
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setMessage(next), 50);
  }, []);

  const api = useMemo(() => ({ announce }), [announce]);

  return (
    <LiveRegionContext.Provider value={api}>
      {children}
      <div role="status" aria-live="polite" aria-atomic="true" className={styles.liveRegion}>
        {message}
      </div>
    </LiveRegionContext.Provider>
  );
}

export function useAnnounce(): (message: string) => void {
  const ctx = useContext(LiveRegionContext);
  if (!ctx) {
    throw new Error('useAnnounce must be used within a LiveRegionProvider');
  }
  return ctx.announce;
}
