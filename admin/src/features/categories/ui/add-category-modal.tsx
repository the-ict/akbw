'use client';

import React, { useState } from 'react';
import {
    X,
    Upload,
    Check,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/shared/ui/modal';
import { cn } from '@/shared/lib/utils';
import { LanguageRoutes } from '@/shared/config/i18n/types';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: {
        id: string;
        name: string;
        status: string;
        image?: string;
    } | null;
    viewOnly?: boolean;
}

const LANGUAGES = [
    { id: LanguageRoutes.UZ, label: 'O‘zbek' },
    { id: LanguageRoutes.RU, label: 'Русский' },
    { id: LanguageRoutes.EN, label: 'English' },
];

export default function AddCategoryModal({ isOpen, onClose, category, viewOnly }: AddCategoryModalProps) {
    const [activeLang, setActiveLang] = useState<LanguageRoutes>(LanguageRoutes.UZ);

    // Form State
    const [names, setNames] = useState<Record<string, string>>({
        [LanguageRoutes.UZ]: '',
        [LanguageRoutes.RU]: '',
        [LanguageRoutes.EN]: '',
    });
    const [descriptions, setDescriptions] = useState<Record<string, string>>({
        [LanguageRoutes.UZ]: '',
        [LanguageRoutes.RU]: '',
        [LanguageRoutes.EN]: '',
    });
    const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

    // Sync state with category prop when editing
    React.useEffect(() => {
        if (category && isOpen) {
            setNames({
                [LanguageRoutes.UZ]: category.name,
                [LanguageRoutes.RU]: category.name + ' (RU)',
                [LanguageRoutes.EN]: category.name + ' (EN)',
            });
            setStatus(category.status as 'Active' | 'Inactive');
        } else if (isOpen) {
            setNames({
                [LanguageRoutes.UZ]: '',
                [LanguageRoutes.RU]: '',
                [LanguageRoutes.EN]: '',
            });
            setStatus('Active');
        }
    }, [category, isOpen]);

    const handleSave = () => {
        // Logic to save category (for now just close)
        onClose();
    };

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-2xl bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
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
                        {/* Image Upload Area */}
                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Kategoriya Rasmi</label>
                            <div className='flex items-center gap-6'>
                                <div className='w-24 h-24 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 relative overflow-hidden group'>
                                    {category?.image ? (
                                        <img src={category.image} alt="" className='w-full h-full object-cover' />
                                    ) : (
                                        <Upload size={24} />
                                    )}
                                    {!viewOnly && (
                                        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer'>
                                            <Upload size={16} className='text-white' />
                                        </div>
                                    )}
                                </div>
                                {!viewOnly && (
                                    <div className='flex-1'>
                                        <Button variant='ghost' className='h-auto p-0 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:bg-transparent'>Rasm yuklash</Button>
                                        <p className='text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold'>SVG, PNG yoki JPG (max. 1MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Language Switcher */}
                        <div className='flex gap-1 p-1 bg-gray-100 rounded-2xl w-fit'>
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => setActiveLang(lang.id)}
                                    className={cn(
                                        'px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                                        activeLang === lang.id ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                    )}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>

                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Nomi ({activeLang.toUpperCase()})</label>
                            <Input
                                disabled={viewOnly}
                                placeholder='Kategoriya nomi...'
                                className='h-12 border-gray-100 rounded-2xl focus-visible:ring-black/10 font-bold'
                                value={names[activeLang]}
                                onChange={(e) => setNames({ ...names, [activeLang]: e.target.value })}
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Tavsif ({activeLang.toUpperCase()})</label>
                            <textarea
                                disabled={viewOnly}
                                placeholder='Kategoriya haqida batafsil...'
                                className='w-full h-32 bg-white border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black/10 transition-all resize-none'
                                value={descriptions[activeLang]}
                                onChange={(e) => setDescriptions({ ...descriptions, [activeLang]: e.target.value })}
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Status</label>
                            <div className='flex gap-3'>
                                {(['Active', 'Inactive'] as const).map((s) => (
                                    <button
                                        key={s}
                                        disabled={viewOnly}
                                        onClick={() => setStatus(s)}
                                        className={cn(
                                            'px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border',
                                            status === s
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200',
                                            viewOnly && status !== s && 'opacity-50 grayscale'
                                        )}
                                    >
                                        {s === 'Active' ? 'Faol' : 'Nofaol'}
                                    </button>
                                ))}
                            </div>
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
