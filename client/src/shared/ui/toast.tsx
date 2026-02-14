'use client';

import { Toaster as Sonner } from 'sonner';
import { monsterrat } from '@/shared/fonts';

export const Toaster = () => {
  return (
    <Sonner
      className={monsterrat.className}
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: '#ffffff',
          color: '#000000',
          border: '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      }}
    />
  );
};

export { toast } from 'sonner';
