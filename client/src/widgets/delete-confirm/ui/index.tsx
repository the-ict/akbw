'use client';

import React from 'react';
import {
  AlertTriangle,
  X
} from 'lucide-react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalDescription,
} from '@/shared/ui/modal';
import { Button } from '@/shared/ui/button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteConfirmModalProps) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-md bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl">
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-red-50/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle size={20} />
              </div>
              <div>
                <ModalTitle className="text-lg font-black uppercase tracking-tight text-red-600">
                  {title}
                </ModalTitle>
                <ModalDescription className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-0.5">
                  O‘chirishni tasdiqlang
                </ModalDescription>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-full transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mt-1 p-4 bg-gray-50 rounded-2xl border border-gray-100 italic text-[11px] font-bold text-gray-400">
              Diqqat: Ushbu amalni ortga qaytarib bo‘lmaydi. Barcha bog‘liq
              ma’lumotlar butunlay o‘chiriladi.
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-50 flex gap-3 bg-gray-50/30">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 rounded-xl h-14 font-black uppercase tracking-widest text-[10px] cursor-pointer"
            >
              Bekor qilish
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 rounded-2xl h-14 bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-200 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              Tasdiqlash
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
