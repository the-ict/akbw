'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/shared/ui/modal';
import { useCreateCategory, useUpdateCategory } from '../../products/lib/hooks';
import { Category } from '../../products/lib/api';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: Category | null;
    viewOnly?: boolean;
}

export default function AddCategoryModal({ isOpen, onClose, category, viewOnly }: AddCategoryModalProps) {
    const [name, setName] = useState('');

    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();

    useEffect(() => {
        if (category && isOpen) {
            setName(category.name);
        } else if (isOpen) {
            setName('');
        }
    }, [category, isOpen]);

    const handleSave = async () => {
        if (category) {
            await updateMutation.mutateAsync({ id: category.id, name });
        } else {
            await createMutation.mutateAsync(name);
        }
        onClose();
    };

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-md bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
                <div className='flex flex-col'>
                    {/* Header */}
                    <div className='p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30'>
                        <div>
                            <ModalTitle className='text-xl font-black uppercase tracking-tight'>
                                {viewOnly ? 'Kategoriya ma’lumotlari' : category ? 'Kategoriyani tahrirlash' : 'Kategoriya qo‘shish'}
                            </ModalTitle>
                            <ModalDescription className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                                {viewOnly ? 'Kategoriya tafsilotlarini ko‘rish' : category ? 'Kategoriya ma’lumotlarini o‘zgartirish' : 'Yangi mahsulot kategoriyasini yarating'}
                            </ModalDescription>
                        </div>
                        <button onClick={onClose} className='p-2 hover:bg-white rounded-full transition-all cursor-pointer'>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='p-8 space-y-6'>
                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Nomi</label>
                            <Input
                                disabled={viewOnly}
                                placeholder='Kategoriya nomi...'
                                className='h-12 border-gray-100 rounded-2xl focus-visible:ring-black/10 font-bold'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='p-8 border-t border-gray-50 flex justify-end bg-gray-50/30 gap-4'>
                        <Button
                            variant='ghost'
                            onClick={onClose}
                            className='rounded-[20px] h-14 px-8 font-black uppercase tracking-widest text-[10px] cursor-pointer'
                        >
                            {viewOnly ? 'Yopish' : 'Bekor qilish'}
                        </Button>
                        {!viewOnly && (
                            <Button
                                onClick={handleSave}
                                disabled={!name}
                                className='rounded-[20px] h-14 px-12 bg-black text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all cursor-pointer'
                            >
                                Saqlash
                            </Button>
                        )}
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
