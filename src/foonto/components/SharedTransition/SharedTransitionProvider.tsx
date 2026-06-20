import type { SharedTransitionProviderProps } from './types';

/**
 * Tracks measured layouts of shared elements across screens.
 * TODO(impl): context + registry of tagged node measurements.
 */
export function SharedTransitionProvider({ children }: SharedTransitionProviderProps) {
  return <>{children}</>;
}
