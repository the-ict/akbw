'use client';

import React from 'react';
import {
    Image as ImageIcon,
    Plus,
    Trash2,
    Move,
    ExternalLink,
    LayoutGrid,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';

const sections = [
    {
        title: 'Bosh Banner (Hero)',
        description: 'Veb-saytning yuqori qismidagi asosiy reklama bannerlari',
        items: [
            { id: '1', title: 'Summer Collection 2026', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80', active: true },
            { id: '2', title: 'New Arrival: Minimalist Pack', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80', active: false },
        ]
    },
    {
        title: 'Kolleksiyalar (Grid)',
        description: 'Home pagedagi yo‘nalishlar (Erkaklar, Ayollar, Sport)',
        items: [
            { id: '3', title: 'Menswear Essentials', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=80', active: true },
            { id: '4', title: 'Womens Edition', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', active: true },
        ]
    }
];

export default function ContentManagment() {
    return (
        <div className='space-y-10 pb-10'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-black uppercase tracking-tight'>Kontent Boshqaruvi</h1>
                    <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Veb-sayt vizual elementlari va media aktivlari</p>
                </div>
                <Button className='rounded-2xl bg-black text-white px-6 py-6 h-auto font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95 cursor-pointer'>
                    <Plus size={18} />
                    Yangi Seksiyal Qo‘shish
                </Button>
            </div>

            {sections.map((section, idx) => (
                <div key={idx} className='bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm'>
                    <div className='flex justify-between items-start mb-10'>
                        <div className='flex items-center gap-5'>
                            <div className='w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center'>
                                <LayoutGrid size={24} className='text-gray-400' />
                            </div>
                            <div>
                                <h2 className='text-lg font-black uppercase tracking-wider'>{section.title}</h2>
                                <p className='text-xs text-gray-400 font-bold uppercase tracking-widest mt-1'>{section.description}</p>
                            </div>
                        </div>
                        <Button variant='outline' className='rounded-xl border-gray-100 h-11 px-4 text-xs font-black uppercase tracking-widest cursor-pointer'>
                            <Move size={16} className='mr-2' />
                            Tartibni o‘zgartirish
                        </Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {section.items.map((item) => (
                            <div key={item.id} className='relative group'>
                                <div className='aspect-video rounded-[32px] overflow-hidden bg-gray-100 border border-gray-50 relative'>
                                    <img src={item.image} alt={item.title} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' />
                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3'>
                                        <button className='w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black hover:scale-110 transition-transform'>
                                            <ExternalLink size={20} />
                                        </button>
                                        <button className='w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 hover:scale-110 transition-transform'>
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    {!item.active && (
                                        <div className='absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em]'>
                                            Draft
                                        </div>
                                    )}
                                </div>
                                <div className='mt-4 px-2'>
                                    <h3 className='text-sm font-black uppercase tracking-tight'>{item.title}</h3>
                                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>ID: MEDIA-00{item.id}</p>
                                </div>
                            </div>
                        ))}
                        <div className='aspect-video rounded-[32px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 text-gray-300 hover:border-black hover:text-black transition-all cursor-pointer bg-gray-50/30'>
                            <div className='p-4 bg-white rounded-2xl shadow-sm'>
                                <ImageIcon size={24} />
                            </div>
                            <span className='text-[10px] font-black uppercase tracking-widest'>Rasm qo‘shish</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
