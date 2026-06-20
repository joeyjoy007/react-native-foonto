import type { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'error' | 'info';

export interface ToastOptions {
  /** Main line of text. */
  message: string;
  /** Optional bold title above the message. */
  title?: string;
  /** Visual style. Defaults to 'default'. */
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. Defaults to 2500. */
  duration?: number;
}

export interface ToastProviderProps {
  children: ReactNode;
  /** Where toasts appear. Defaults to 'top'. */
  position?: 'top' | 'bottom';
  /** Inset from the top edge when position is 'top'. Defaults to 60. */
  topOffset?: number;
  /** Inset from the bottom edge when position is 'bottom'. Defaults to 40. */
  bottomOffset?: number;
}

export interface ToastApi {
  /** Show a toast. */
  show: (options: ToastOptions) => string;
  /** Dismiss a toast by id. */
  hide: (id: string) => void;
}

export interface ToastData {
  id: string;
  message: string;
  title?: string;
  variant: ToastVariant;
  duration: number;
}
