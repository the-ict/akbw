'use client';

import React, { useState } from 'react';
import {
    X,
    Upload,
    Plus,
    Trash2,
    Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Modal, ModalContent } from '@/shared/ui/modal';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
    const [step, setStep] = useState(1);
    const [images, setImages] = useState<string[]>([]);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-3xl bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
                <div className='flex flex-col h-[85vh]'>
                    {/* Header */}
                    <div className='p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30'>
                        <div>
                            <h2 className='text-xl font-black uppercase tracking-tight'>Mahsulot qo‘shish</h2>
                            <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                                Qadam {step} / 3 — {step === 1 ? 'Asosiy ma\'lumotlar' : step === 2 ? 'Media va Stock' : 'Varyantlar'}
                            </p>
                        </div>
                        <button onClick={onClose} className='p-2 hover:bg-white rounded-full transition-all cursor-pointer'>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='flex-1 p-8 overflow-y-auto no-scrollbar'>
                        {step === 1 && (
                            <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Nomi</label>
                                        <Input placeholder='Mahsulot nomi...' className='h-12 border-gray-100 rounded-2xl focus-visible:ring-black/10' />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Kategoriya</label>
                                        <select className='w-full h-12 bg-white border border-gray-100 rounded-2xl px-4 text-sm font-bold focus:ring-1 focus:ring-black/10 transition-all'>
                                            <option>T-Shirts</option>
                                            <option>Outerwear</option>
                                            <option>Shoes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Tavsif</label>
                                    <textarea
                                        placeholder='Mahsulot haqida batafsil...'
                                        className='w-full h-32 bg-white border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black/10 transition-all resize-none'
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Narx ($)</label>
                                        <Input type='number' placeholder='0.00' className='h-12 border-gray-100 rounded-2xl' />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Chegirma Narxi ($)</label>
                                        <Input type='number' placeholder='Ixtiyoriy' className='h-12 border-gray-100 rounded-2xl' />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                                <div className='space-y-4'>
                                    <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Mahsulot Rasmlari</label>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className='aspect-square rounded-[24px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-black hover:text-black transition-all cursor-pointer bg-gray-50/50'>
                                            <Upload size={24} />
                                            <span className='text-[10px] font-black uppercase tracking-widest'>Yuklash</span>
                                        </div>
                                        {[1, 2].map(i => (
                                            <div key={i} className='aspect-square rounded-[24px] bg-gray-100 relative group overflow-hidden'>
                                                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                                    <button className='p-2 bg-red-500 text-white rounded-full'>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
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
                                        <div className='flex items-center gap-4 bg-gray-100 p-2 rounded-2xl'>
                                            <button className='w-10 h-10 bg-white rounded-xl shadow-sm font-black'>-</button>
                                            <span className='w-12 text-center text-lg font-black'>45</span>
                                            <button className='w-10 h-10 bg-black text-white rounded-xl shadow-lg font-black'>+</button>
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
                                        <button className='text-[10px] font-black uppercase tracking-widest text-blue-500'>+ qo‘shish</button>
                                    </div>
                                    <div className='flex flex-wrap gap-2'>
                                        {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(size => (
                                            <button key={size} className='px-6 py-3 border border-gray-100 rounded-xl text-xs font-black hover:border-black active:bg-black active:text-white transition-all'>
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className='space-y-4 pt-4 border-t border-gray-50'>
                                    <div className='flex justify-between items-center'>
                                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Ranglar</label>
                                        <button className='text-[10px] font-black uppercase tracking-widest text-blue-500'>+ qo‘shish</button>
                                    </div>
                                    <div className='flex gap-3'>
                                        {['bg-black', 'bg-white border-gray-200', 'bg-red-500', 'bg-blue-500', 'bg-gray-400'].map((color, i) => (
                                            <button key={i} className={`w-10 h-10 rounded-full ${color} shadow-sm ring-2 ring-transparent hover:ring-gray-200 p-1 transition-all`}>
                                                {i === 0 && <div className='w-full h-full rounded-full border border-white/20' />}
                                            </button>
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
                            {step === 3 ? 'Saqlash' : 'Keyingi'}
                        </Button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
