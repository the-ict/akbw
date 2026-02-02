'use client';

import React, { useState } from 'react';
import {
    X,
    Upload,
    Plus,
    Trash2,
    Image as ImageIcon,
    Check,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/shared/ui/modal';
import { cn } from '@/shared/lib/utils';
import { LanguageRoutes } from '@/shared/config/i18n/types';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: {
        id: string;
        name: string;
        category: string;
        price: number;
        stock: number;
        image: string;
        status: string;
    } | null;
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

    const [images, setImages] = useState<string[]>([]);
    const [stock, setStock] = useState(45);
    const [price, setPrice] = useState<string>('');
    const [discountPrice, setDiscountPrice] = useState<string>('');

    // Categories
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['T-Shirts']);
    const allCategories = ['T-Shirts', 'Outerwear', 'Shoes', 'Pants', 'Accessories'];

    const [sizes, setSizes] = useState(['XS', 'S', 'M', 'L', 'XL', '2XL']);
    const [showSizeInput, setShowSizeInput] = useState(false);
    const [newSize, setNewSize] = useState('');

    const [colors, setColors] = useState([
        { id: 1, value: 'bg-black' },
        { id: 2, value: 'bg-white border-gray-200' },
        { id: 3, value: 'bg-red-500' },
        { id: 4, value: 'bg-blue-500' },
        { id: 5, value: 'bg-gray-400' },
    ]);
    const [showColorInput, setShowColorInput] = useState(false);
    const [newColor, setNewColor] = useState('#000000');
    const [newColorHex, setNewColorHex] = useState('');

    // Sync state with product prop when editing
    React.useEffect(() => {
        if (product && isOpen) {
            setNames({
                [LanguageRoutes.UZ]: product.name,
                [LanguageRoutes.RU]: product.name + ' (RU)',
                [LanguageRoutes.EN]: product.name + ' (EN)',
            });
            setDescriptions({
                [LanguageRoutes.UZ]: 'Description in UZ',
                [LanguageRoutes.RU]: 'Description in RU',
                [LanguageRoutes.EN]: 'Description in EN',
            });
            setStock(product.stock);
            setPrice(product.price.toString());
            setSelectedCategories([product.category]);
            // Mocking images, sizes, colors for now
            setImages([product.image]);
            setStep(1);
        } else if (isOpen) {
            setNames({
                [LanguageRoutes.UZ]: '',
                [LanguageRoutes.RU]: '',
                [LanguageRoutes.EN]: '',
            });
            setDescriptions({
                [LanguageRoutes.UZ]: '',
                [LanguageRoutes.RU]: '',
                [LanguageRoutes.EN]: '',
            });
            setStock(0);
            setPrice('');
            setSelectedCategories(['T-Shirts']);
            setImages([]);
            setStep(1);
        }
    }, [product, isOpen]);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleAddSize = () => {
        if (newSize.trim() && !sizes.includes(newSize.trim().toUpperCase())) {
            setSizes([...sizes, newSize.trim().toUpperCase()]);
            setNewSize('');
            setShowSizeInput(false);
        }
    };

    const handleAddColor = () => {
        const colorValue = newColorHex.trim() ? (newColorHex.startsWith('#') ? newColorHex : `#${newColorHex}`) : newColor;
        setColors([...colors, { id: Date.now(), value: `style:${colorValue}` }]);
        setNewColorHex('');
        setShowColorInput(false);
    };

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const removeSize = (sizeToRemove: string) => {
        setSizes(sizes.filter(s => s !== sizeToRemove));
    };

    const removeColor = (idToRemove: number) => {
        setColors(colors.filter(c => c.id !== idToRemove));
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
                                            value={names[activeLang]}
                                            onChange={(e) => setNames({ ...names, [activeLang]: e.target.value })}
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Kategoriyalar</label>
                                        <div className='flex flex-wrap gap-2'>
                                            {allCategories.map(cat => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    disabled={viewOnly}
                                                    onClick={() => toggleCategory(cat)}
                                                    className={cn(
                                                        'px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border',
                                                        selectedCategories.includes(cat)
                                                            ? 'bg-black text-white border-black'
                                                            : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300',
                                                        viewOnly && selectedCategories.includes(cat) && 'opacity-100',
                                                        viewOnly && !selectedCategories.includes(cat) && 'opacity-50 cursor-not-allowed'
                                                    )}
                                                >
                                                    {cat}
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
                                        value={descriptions[activeLang]}
                                        onChange={(e) => setDescriptions({ ...descriptions, [activeLang]: e.target.value })}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Narx ($)</label>
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
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Chegirma Narxi ($)</label>
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
                                        {[1, 2].map(i => (
                                            <div key={i} className='aspect-square rounded-[24px] bg-gray-100 relative group overflow-hidden'>
                                                {!viewOnly && (
                                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                                        <button className='p-2 bg-red-500 text-white rounded-full'>
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                                <div className='w-full h-full flex items-center justify-center text-gray-300'>
                                                    <ImageIcon size={32} />
                                                </div>
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
                                                className='w-10 h-10 bg-white rounded-xl shadow-sm font-black'
                                            >-</button>
                                            <span className='w-12 text-center text-lg font-black'>{stock}</span>
                                            <button
                                                disabled={viewOnly}
                                                onClick={() => setStock(stock + 1)}
                                                className='w-10 h-10 bg-black text-white rounded-xl shadow-lg font-black'
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
                                                className='text-[10px] font-black uppercase tracking-widest text-blue-500'
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
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddSize()}
                                            />
                                            <Button onClick={handleAddSize} className='h-10 bg-black text-white px-4 rounded-xl'>
                                                <Plus size={16} />
                                            </Button>
                                        </div>
                                    )}

                                    <div className='flex flex-wrap gap-2'>
                                        {sizes.map(size => (
                                            <div key={size} className='group relative'>
                                                <button className='px-6 py-3 border border-gray-100 rounded-xl text-xs font-black hover:border-black active:bg-black active:text-white transition-all'>
                                                    {size}
                                                </button>
                                                {!viewOnly && (
                                                    <button
                                                        onClick={() => removeSize(size)}
                                                        className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex shadow-lg'
                                                    >
                                                        <X size={10} strokeWidth={3} />
                                                    </button>
                                                )}
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
                                                className='text-[10px] font-black uppercase tracking-widest text-blue-500'
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
                                                    className='w-10 h-10 rounded-lg border-none p-0 cursor-pointer overflow-hidden'
                                                />
                                                <div className='flex items-center'>
                                                    <span className='pl-2 text-[10px] font-black text-gray-400'>#</span>
                                                    <Input
                                                        placeholder='FFFFFF'
                                                        value={newColorHex}
                                                        onChange={(e) => setNewColorHex(e.target.value.replace('#', ''))}
                                                        className='h-10 w-24 border-none bg-transparent text-xs font-black uppercase focus-visible:ring-0'
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleAddColor}
                                                className='h-12 px-6 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95'
                                            >
                                                Qo‘shish
                                            </button>
                                        </div>
                                    )}

                                    <div className='flex flex-wrap gap-3'>
                                        {colors.map((color) => (
                                            <div key={color.id} className='group relative'>
                                                <button
                                                    className={cn(
                                                        'w-10 h-10 rounded-full shadow-sm ring-2 ring-transparent hover:ring-gray-200 p-1 transition-all',
                                                        color.value.startsWith('bg-') ? color.value : ''
                                                    )}
                                                    style={color.value.startsWith('style:') ? { backgroundColor: color.value.replace('style:', '') } : {}}
                                                >
                                                    {color.value === 'bg-white border-gray-200' && <div className='w-full h-full rounded-full border border-gray-100' />}
                                                </button>
                                                {!viewOnly && (
                                                    <button
                                                        onClick={() => removeColor(color.id)}
                                                        className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex shadow-lg z-10'
                                                    >
                                                        <X size={10} strokeWidth={3} />
                                                    </button>
                                                )}
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
                            onClick={step === 3 ? onClose : nextStep}
                            className='rounded-[20px] h-14 px-12 bg-black text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all cursor-pointer'
                        >
                            {viewOnly ? (step === 3 ? 'Yopish' : 'Keyingi') : (step === 3 ? 'Saqlash' : 'Keyingi')}
                        </Button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
