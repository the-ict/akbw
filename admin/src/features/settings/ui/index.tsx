'use client';

import React from 'react';
import {
    Save,
    Globe,
    Truck,
    MessageSquare,
    Search,
    Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export default function Settings() {
    return (
        <div className='max-w-4xl space-y-8 pb-10'>
            <div>
                <h1 className='text-2xl font-black uppercase tracking-tight'>Sozlamalar</h1>
                <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Sayt deklaratsiyasi va global sozlamalar</p>
            </div>

            <div className='bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden'>
                <div className='p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/10'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center'>
                            <Globe size={20} />
                        </div>
                        <div>
                            <h2 className='text-sm font-black uppercase tracking-widest'>Umumiy Sozlamalar</h2>
                            <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Sayt nomi va basic SEO</p>
                        </div>
                    </div>
                    <Button className='rounded-2xl bg-black text-white h-11 px-6 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-transform hover:scale-105'>
                        <Save size={16} />
                        Saqlash
                    </Button>
                </div>

                <div className='p-8 space-y-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Sayt Nomi</label>
                            <Input defaultValue='AKBW — Premium Clothing' className='h-12 border-gray-100 rounded-2xl font-bold focus:ring-black/10' />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Valyuta (Primary)</label>
                            <select className='w-full h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-bold'>
                                <option>UZS (So‘m)</option>
                                <option>USD ($)</option>
                            </select>
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>SEO Tavsif (Meta Description)</label>
                        <textarea
                            defaultValue='AKBW — O‘zbekistondagi premium kiyim-kechak brendi. Minimalizm va sifat uyg‘unligi.'
                            className='w-full h-32 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-1 focus:ring-black/10 transition-all resize-none'
                        />
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-white rounded-[32px] border border-gray-100 shadow-sm p-8'>
                    <div className='flex items-center gap-4 mb-8'>
                        <div className='w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center'>
                            <Truck size={18} />
                        </div>
                        <h2 className='text-xs font-black uppercase tracking-widest'>Yetkazib berish</h2>
                    </div>
                    <div className='space-y-6'>
                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Standart Narx (Toshkent)</label>
                            <Input defaultValue='20,000 UZS' className='h-12 border-gray-100 rounded-2xl font-bold' />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Viloyatlar bo‘yicha</label>
                            <Input defaultValue='35,000 UZS' className='h-12 border-gray-100 rounded-2xl font-bold' />
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-[32px] border border-gray-100 shadow-sm p-8'>
                    <div className='flex items-center gap-4 mb-8'>
                        <div className='w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center'>
                            <MessageSquare size={18} />
                        </div>
                        <h2 className='text-xs font-black uppercase tracking-widest'>Aloqa (Support)</h2>
                    </div>
                    <div className='space-y-6'>
                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Telegram Username (@)</label>
                            <Input defaultValue='akbw_admin' className='h-12 border-gray-100 rounded-2xl font-bold' />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-[10px] uppercase tracking-widest font-black text-gray-400'>Telefon (Call Center)</label>
                            <Input defaultValue='+998 90 000 00 00' className='h-12 border-gray-100 rounded-2xl font-bold' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
