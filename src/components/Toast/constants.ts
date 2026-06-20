import type { ToastVariant } from './types';

/** Per-variant background, foreground, and glyph. */
export const VARIANT_STYLES: Record<
  ToastVariant,
  { bg: string; fg: string; icon: string }
> = {
  default: { bg: '#27272a', fg: '#ffffff', icon: '•' },
  success: { bg: '#16a34a', fg: '#ffffff', icon: '✓' },
  error: { bg: '#dc2626', fg: '#ffffff', icon: '!' },
  info: { bg: '#2563eb', fg: '#ffffff', icon: 'i' },
};

export const DEFAULT_DURATION = 2500;
