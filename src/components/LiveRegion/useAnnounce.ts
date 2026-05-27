import { createContext, useContext } from 'react';

/** Shared context + hook for the app-level aria-live announcer (T020). */
export interface LiveRegionApi {
  announce: (message: string) => void;
}

export const LiveRegionContext = createContext<LiveRegionApi | null>(null);

export function useAnnounce(): (message: string) => void {
  const ctx = useContext(LiveRegionContext);
  if (!ctx) {
    throw new Error('useAnnounce must be used within a LiveRegionProvider');
  }
  return ctx.announce;
}
