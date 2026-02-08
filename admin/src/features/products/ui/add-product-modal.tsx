'use client';

import React, { useState } from 'react';
import {
    X,
    Upload,
    Plus,
    Trash2,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/shared/ui/modal';
import { cn } from '@/shared/lib/utils';
import { LanguageRoutes } from '@/shared/config/i18n/types';

import { IProduct, ICreateProduct } from '@/shared/config/api/product/product.modal';

import { useCategories } from '../../categories/lib/hooks';
import { useProducts, useCreateProduct, useUpdateProduct } from '../lib/hooks';
import { getSizesRequest, getColorsRequest, createSizeRequest, createColorRequest } from '@/shared/config/api/product/product.request';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';


interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: IProduct | null;
    viewOnly?: boolean;
}


const LANGUAGES = [
    { id: LanguageRoutes.UZ, label: 'O‘zbek' },
    { id: LanguageRoutes.RU, label: 'Русский' },
    { id: LanguageRoutes.EN, label: 'English' },
];

export default function AddProductModal({ isOpen, onClose, product, viewOnly }: AddProductModalProps) {
    const [step, setStep] = useState(1);
    const [activeLang, setActiveLang] = useState<LanguageRoutes>(LanguageRoutes.UZ);

    const [images, setImages] = useState<string[]>([]);
    const [stock, setStock] = useState(45);
    const [price, setPrice] = useState<string>('');
    const [discountPrice, setDiscountPrice] = useState<string>('');

    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);

    const [showSizeInput, setShowSizeInput] = useState(false);
    const [newSize, setNewSize] = useState('');
    const [showColorInput, setShowColorInput] = useState(false);
    const [newColor, setNewColor] = useState('#000000');
    const [newColorHex, setNewColorHex] = useState('');

    const [translations, setTranslations] = useState<Record<string, { name: string, description: string }>>({
        [LanguageRoutes.UZ]: { name: '', description: '' },
        [LanguageRoutes.RU]: { name: '', description: '' },
        [LanguageRoutes.EN]: { name: '', description: '' },
    });

    const queryClient = useQueryClient();
    const { data: categories = [] } = useCategories();
    const { data: sizes = [] } = useQuery({ queryKey: ['sizes'], queryFn: getSizesRequest });
    const { data: colors = [] } = useQuery({ queryKey: ['colors'], queryFn: getColorsRequest });

    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();

    const createSizeMutation = useMutation({
        mutationFn: createSizeRequest,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sizes'] });
            setSelectedSizes(prev => [...prev, data.size.id]);
            setNewSize('');
            setShowSizeInput(false);
            toast.success('O‘lcham muvaffaqiyatli qo‘shildi');
        }
    });

    const createColorMutation = useMutation({
        mutationFn: createColorRequest,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['colors'] });
            setSelectedColors(prev => [...prev, data.color.id]);
            setNewColorHex('');
            setShowColorInput(false);
            toast.success('Rang muvaffaqiyatli qo‘shildi');
        }
    });

    const handleAddSize = () => {
        if (!newSize.trim()) return;
        const translations = LANGUAGES.map(lang => ({
            lang: lang.id,
            name: newSize.trim()
        }));
        createSizeMutation.mutate({ translations });
    };

    const handleAddColor = () => {
        const hexValue = newColorHex ? (newColorHex.startsWith('#') ? newColorHex : `#${newColorHex}`) : newColor;
        if (!hexValue) return;
        const translations = LANGUAGES.map(lang => ({
            lang: lang.id,
            name: hexValue
        }));
        createColorMutation.mutate({ translations });
    };


    React.useEffect(() => {
        if (product && isOpen) {
            setPrice(product.price.toString());
            setStock(45);
            setSelectedCategories(product.categories?.map(c => c.id) || []);
            setSelectedSizes(product.sizes?.map(s => s.id) || []);
            setSelectedColors(product.colors?.map(c => c.id) || []);
        } else if (!product && isOpen) {
            setPrice('');
            setStock(0);
            setSelectedCategories([]);
            setSelectedSizes([]);
            setSelectedColors([]);
            setTranslations({
                [LanguageRoutes.UZ]: { name: '', description: '' },
                [LanguageRoutes.RU]: { name: '', description: '' },
                [LanguageRoutes.EN]: { name: '', description: '' },
            });
        }
    }, [product, isOpen]);


    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const toggleCategory = (id: number) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const toggleSize = (id: number) => {
        setSelectedSizes(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const toggleColor = (id: number) => {
        setSelectedColors(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const handleSave = async () => {
        const payload: ICreateProduct = {
            price: Number(price),
            product_images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
            categories: selectedCategories,
            sizes: selectedSizes,
            colors: selectedColors,
            translations: Object.entries(translations)
                .filter(([_, data]) => data.name.trim() !== '')
                .map(([lang, data]) => ({
                    lang,
                    name: data.name,
                    description: data.description
                }))
        };

        if (payload.translations.length === 0) {
            toast.error('Kamida bitta tilda nom kiritish majburiy');
            return;
        }

        try {
            if (product) {
                await updateMutation.mutateAsync({ id: product.id, ...payload });
            } else {
                await createMutation.mutateAsync(payload);
            }
            onClose();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-3xl bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
                <div className='flex flex-col h-[85vh]'>
                    {/* Header */}
                    <div className='p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30'>
                        <div>
                            <ModalTitle className='text-xl font-black uppercase tracking-tight'>
                                {viewOnly ? 'Mahsulot ma’lumotlari' : product ? 'Mahsulotni tahrirlash' : 'Mahsulot qo‘shish'}
                            </ModalTitle>
                            <ModalDescription className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                                {viewOnly ? 'Mahsulot tafsilotlarini ko‘rish' : `Qadam ${step} / 3 — ${step === 1 ? 'Asosiy ma\'lumotlar' : step === 2 ? 'Media va Stock' : 'Varyantlar'}`}
                            </ModalDescription>
                        </div>
                        <button onClick={onClose} className='p-2 hover:bg-white rounded-full transition-all cursor-pointer'>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='flex-1 p-8 overflow-y-auto no-scrollbar'>
                        {step === 1 && (
                            <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
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

                                <div className='grid grid-cols-2 gap-6'>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Nomi ({activeLang.toUpperCase()})</label>
                                        <Input
                                            disabled={viewOnly}
                                            placeholder='Mahsulot nomi...'
                                            className='h-12 border-gray-100 rounded-2xl focus-visible:ring-black/10 font-bold'
                                            value={translations[activeLang]?.name || ''}
                                            onChange={(e) => setTranslations(prev => ({
                                                ...prev,
                                                [activeLang]: { ...prev[activeLang], name: e.target.value }
                                            }))}
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Kategoriyalar</label>
                                        <div className='flex flex-wrap gap-2'>
                                            {categories.map((cat: any) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    disabled={viewOnly}
                                                    onClick={() => toggleCategory(cat.id)}
                                                    className={cn(
                                                        'px-3 py-1.5 cursor-pointer rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border',
                                                        selectedCategories.includes(cat.id)
                                                            ? 'bg-black text-white border-black'
                                                            : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300',
                                                        viewOnly && selectedCategories.includes(cat.id) && 'opacity-100',
                                                        viewOnly && !selectedCategories.includes(cat.id) && 'opacity-50 cursor-not-allowed'
                                                    )}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Tavsif ({activeLang.toUpperCase()})</label>
                                    <textarea
                                        disabled={viewOnly}
                                        placeholder='Mahsulot haqida batafsil...'
                                        className='w-full h-32 bg-white border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black/10 transition-all resize-none'
                                        value={translations[activeLang]?.description || ''}
                                        onChange={(e) => setTranslations(prev => ({
                                            ...prev,
                                            [activeLang]: { ...prev[activeLang], description: e.target.value }
                                        }))}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Narx (UZS)</label>
                                        <Input
                                            disabled={viewOnly}
                                            type='number'
                                            placeholder='0.00'
                                            className='h-12 border-gray-100 rounded-2xl'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Chegirma Narxi (UZS)</label>
                                        <Input
                                            disabled={viewOnly}
                                            type='number'
                                            placeholder='Ixtiyoriy'
                                            className='h-12 border-gray-100 rounded-2xl'
                                            value={discountPrice}
                                            onChange={(e) => setDiscountPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                                <div className='space-y-4'>
                                    <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Mahsulot Rasmlari</label>
                                    <div className='grid grid-cols-4 gap-4'>
                                        {!viewOnly && (
                                            <div className='aspect-square rounded-[24px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-black hover:text-black transition-all cursor-pointer bg-gray-50/50'>
                                                <Upload size={24} />
                                                <span className='text-[10px] font-black uppercase tracking-widest'>Yuklash</span>
                                            </div>
                                        )}
                                        {images.map((img, i) => (
                                            <div key={i} className='aspect-square rounded-[24px] bg-gray-100 relative group overflow-hidden'>
                                                {!viewOnly && (
                                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                                        <button
                                                            onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                                                            className='p-2 bg-red-500 text-white rounded-full'
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                                <img src={img} alt="Product" className='w-full h-full object-cover' />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='space-y-4 pt-4 border-t border-gray-50'>
                                    <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Ombor Miqdori</label>
                                    <div className='flex items-center gap-6'>
                                        <div className={cn('flex items-center gap-4 bg-gray-100 p-2 rounded-2xl', viewOnly && 'opacity-60 cursor-not-allowed')}>
                                            <button
                                                disabled={viewOnly}
                                                onClick={() => setStock(Math.max(0, stock - 1))}
                                                className='w-10 h-10 bg-white rounded-xl shadow-sm font-black cursor-pointer'
                                            >-</button>
                                            <span className='w-12 text-center text-lg font-black'>{stock}</span>
                                            <button
                                                disabled={viewOnly}
                                                onClick={() => setStock(stock + 1)}
                                                className='w-10 h-10 bg-black text-white rounded-xl shadow-lg font-black cursor-pointer'
                                            >+</button>
                                        </div>
                                        <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Dona mahsulot mavjud</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                                <div className='space-y-4'>
                                    <div className='flex justify-between items-center'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>O‘lchamlar</label>
                                        {!viewOnly && (
                                            <button
                                                onClick={() => setShowSizeInput(!showSizeInput)}
                                                className='text-[10px] font-black uppercase tracking-widest text-blue-500 cursor-pointer'
                                            >
                                                {showSizeInput ? 'Yopish' : '+ qo‘shish'}
                                            </button>
                                        )}
                                    </div>

                                    {showSizeInput && (
                                        <div className='flex gap-2 animate-in fade-in slide-in-from-top-2'>
                                            <Input
                                                placeholder='Masalan: XXL'
                                                value={newSize}
                                                onChange={(e) => setNewSize(e.target.value)}
                                                className='h-10 text-xs font-bold uppercase'
                                            />
                                            <Button
                                                onClick={handleAddSize}
                                                disabled={createSizeMutation.isPending}
                                                className={cn('h-10 bg-black text-white px-4 rounded-xl', createSizeMutation.isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')}
                                            >
                                                {createSizeMutation.isPending ? '...' : <Plus size={16} />}
                                            </Button>

                                        </div>
                                    )}


                                    <div className='flex flex-wrap gap-2'>
                                        {sizes.map((size: any) => (
                                            <div key={size.id} className='group relative'>
                                                <button
                                                    onClick={() => toggleSize(size.id)}
                                                    className={cn(
                                                        'px-6 py-3 border border-gray-100 rounded-xl text-xs font-black transition-all cursor-pointer',
                                                        selectedSizes.includes(size.id) ? 'bg-black text-white border-black' : 'hover:border-black'
                                                    )}
                                                >
                                                    {size.name}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='space-y-4 pt-4 border-t border-gray-50'>
                                    <div className='flex justify-between items-center'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Ranglar</label>
                                        {!viewOnly && (
                                            <button
                                                onClick={() => setShowColorInput(!showColorInput)}
                                                className='text-[10px] font-black uppercase tracking-widest text-blue-500 cursor-pointer'
                                            >
                                                {showColorInput ? 'Yopish' : '+ qo‘shish'}
                                            </button>
                                        )}
                                    </div>

                                    {showColorInput && (
                                        <div className='flex items-center gap-3 animate-in fade-in slide-in-from-top-2'>
                                            <div className='flex items-center gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100'>
                                                <input
                                                    type="color"
                                                    value={newColor}
                                                    onChange={(e) => setNewColor(e.target.value)}
                                                    className='w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none p-0'
                                                />
                                                <div className='flex items-center'>
                                                    <span className='pl-2 text-[10px] font-black text-gray-400'>#</span>
                                                    <Input
                                                        placeholder='FFFFFF'
                                                        value={newColorHex}
                                                        onChange={(e) => setNewColorHex(e.target.value)}
                                                        className='h-10 w-24 border-none bg-transparent text-xs font-black uppercase'
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                onClick={handleAddColor}
                                                disabled={createColorMutation.isPending}
                                                className={cn('h-10 bg-black text-white px-4 rounded-xl', createColorMutation.isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')}
                                            >
                                                {createColorMutation.isPending ? '...' : <Plus size={16} />}
                                            </Button>

                                        </div>
                                    )}


                                    <div className='flex flex-wrap gap-3'>
                                        {colors.map((color: any) => (
                                            <div key={color.id} className='group relative'>
                                                <button
                                                    onClick={() => toggleColor(color.id)}
                                                    className={cn(
                                                        'w-10 h-10 rounded-full shadow-sm ring-2 p-1 transition-all cursor-pointer',
                                                        selectedColors.includes(color.id) ? 'ring-black scale-110' : 'ring-transparent'
                                                    )}
                                                    style={{ backgroundColor: color.name }}
                                                >
                                                    {color.name.toLowerCase() === 'white' && <div className='w-full h-full rounded-full border border-gray-100' />}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className='p-8 border-t border-gray-50 flex justify-between bg-gray-50/30'>
                        <Button
                            variant='ghost'
                            onClick={prevStep}
                            disabled={step === 1}
                            className='rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-[10px] cursor-pointer'
                        >
                            Orqaga
                        </Button>
                        <Button
                            onClick={step === 3 && !viewOnly ? handleSave : nextStep}
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className='rounded-[20px] h-14 px-12 bg-black text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all cursor-pointer'
                        >
                            {createMutation.isPending || updateMutation.isPending ? 'Saqlanmoqda...' : viewOnly ? (step === 3 ? 'Yopish' : 'Keyingi') : (step === 3 ? 'Saqlash' : 'Keyingi')}
                        </Button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}

