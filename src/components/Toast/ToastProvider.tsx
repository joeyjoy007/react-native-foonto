import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

import { DEFAULT_DURATION } from './constants';
import { ToastItem } from './ToastItem';
import type { ToastApi, ToastData, ToastOptions, ToastProviderProps } from './types';

const ToastContext = createContext<ToastApi | null>(null);

/** Access the toast API. Must be called inside a {@link ToastProvider}. */
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>.');
  }
  return ctx;
}

/** Wrap your app (or a screen) to enable toasts via {@link useToast}. */
export function ToastProvider({
  children,
  position = 'top',
  topOffset = 60,
  bottomOffset = 40,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const counter = useRef(0);

  const hide = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((options: ToastOptions) => {
    const id = String(counter.current++);
    const data: ToastData = {
      id,
      message: options.message,
      title: options.title,
      variant: options.variant ?? 'default',
      duration: options.duration ?? DEFAULT_DURATION,
    };
    setToasts((prev) => [...prev, data]);
    return id;
  }, []);

  const api = useMemo<ToastApi>(() => ({ show, hide }), [show, hide]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <View
        pointerEvents="box-none"
        style={[
          styles.container,
          position === 'top' ? { top: topOffset } : { bottom: bottomOffset },
        ]}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            data={toast}
            position={position}
            onDismiss={() => hide(toast.id)}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
  },
});
