'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
    Modal,
    ModalContent,
    ModalTitle,
    ModalDescription
} from '@/shared/ui/modal';
import {
    cn
} from '@/shared/lib/utils';
import {
    LanguageRoutes
} from '@/shared/config/i18n/types';

import {
    ICategory,
} from '@/shared/config/api/product/product.modal';
import { useCreateCategory, useUpdateCategory, useCategory } from '../lib/hooks';
import { toast } from 'sonner';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: ICategory | null;
    viewOnly?: boolean;
}

const LANGUAGES = [
    { id: LanguageRoutes.UZ, label: 'O‘zbek' },
    { id: LanguageRoutes.RU, label: 'Русский' },
    { id: LanguageRoutes.EN, label: 'English' },
];

export default function AddCategoryModal({ isOpen, onClose, category, viewOnly }: AddCategoryModalProps) {
    const [activeLang, setActiveLang] = useState<LanguageRoutes>(LanguageRoutes.UZ);
    const [translations, setTranslations] = useState<Record<string, string>>({
        [LanguageRoutes.UZ]: '',
        [LanguageRoutes.RU]: '',
        [LanguageRoutes.EN]: '',
    });

    const { data: categoryData, isLoading: isLoadingCategory } = useCategory(category?.id);
    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();

    React.useEffect(() => {
        if (categoryData) {
            const transMap: Record<string, string> = {
                [LanguageRoutes.UZ]: '',
                [LanguageRoutes.RU]: '',
                [LanguageRoutes.EN]: '',
            };
            categoryData.translations.forEach((t: any) => {
                transMap[t.lang] = t.name;
            });
            setTranslations(transMap);
        } else if (!category) {
            setTranslations({
                [LanguageRoutes.UZ]: '',
                [LanguageRoutes.RU]: '',
                [LanguageRoutes.EN]: '',
            });
        }
    }, [categoryData, category, isOpen]);


    const handleSave = async () => {
        const payload = {
            translations: Object.entries(translations)
                .filter(([_, name]) => name.trim() !== '')
                .map(([lang, name]) => ({
                    lang,
                    name
                }))
        };

        if (payload.translations.length === 0) {
            toast.error('Kamida bitta tilda nom kiritish majburiy');
            return;
        }

        try {
            if (category) {
                await updateMutation.mutateAsync({ id: category.id, ...payload });
            } else {
                await createMutation.mutateAsync(payload);
            }
            onClose();
        } catch (error) {
            // Error is handled in hook
        }
    };

    const handleTranslationChange = (val: string) => {
        setTranslations(prev => ({
            ...prev,
            [activeLang]: val
        }));
    };

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-md bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
                <div className='flex flex-col'>
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

                    <div className='p-8 space-y-6'>
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
                                value={translations[activeLang] || ''}
                                onChange={(e) => handleTranslationChange(e.target.value)}
                            />
                        </div>
                    </div>

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
                                disabled={createMutation.isPending || updateMutation.isPending}
                                className='rounded-[20px] h-14 px-12 bg-black text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all cursor-pointer'
                            >
                                {createMutation.isPending || updateMutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
                            </Button>
                        )}
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}

