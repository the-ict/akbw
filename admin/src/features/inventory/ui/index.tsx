'use client';

import React from 'react';
import {
    Box,
    ArrowRight,
    Search,
} from 'lucide-react';

const inventory = [
    { name: 'Oversized T-Shirt (Black)', category: 'T-Shirts', stock: 124, status: 'In Stock', color: 'bg-green-500' },
    { name: 'Oversized T-Shirt (White)', category: 'T-Shirts', stock: 12, status: 'Low Stock', color: 'bg-orange-500' },
    { name: 'Slim Denim Jacket', category: 'Outerwear', stock: 5, status: 'Critically Low', color: 'bg-red-500' },
    { name: 'Classic Sneakers', category: 'Shoes', stock: 0, status: 'Out of Stock', color: 'bg-gray-300' },
];

export default function Inventory() {
    return (
        <div className='space-y-8'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                <div className='lg:col-span-3 space-y-6'>
                    <div className='bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm'>
                        <div className='p-6 border-b border-gray-50 flex items-center justify-between'>
                            <h2 className='text-[10px] uppercase font-black tracking-widest text-gray-400'>Mahsulotlar Qoldig‘i</h2>
                            <div className='relative w-64'>
                                <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
                                <input placeholder='Search items...' className='pl-10 h-10 w-full bg-gray-50 border-none rounded-xl text-xs font-medium' />
                            </div>
                        </div>
                        <div className='divide-y divide-gray-50'>
                            {inventory.map((item, i) => (
                                <div key={i} className='p-6 flex items-center justify-between hover:bg-gray-50/50 transition-all'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center'>
                                            <Box size={20} className='text-gray-400' />
                                        </div>
                                        <div>
                                            <p className='text-sm font-black uppercase'>{item.name}</p>
                                            <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{item.category}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-12'>
                                        <div className='text-center'>
                                            <p className='text-sm font-black'>{item.stock}</p>
                                            <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Donada</p>
                                        </div>
                                        <div className='w-32'>
                                            <div className='flex items-center gap-2 mb-1'>
                                                <div className={cn('w-2 h-2 rounded-full', item.color)} />
                                                <span className='text-[10px] font-black uppercase tracking-widest'>{item.status}</span>
                                            </div>
                                            <div className='w-full h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                                                <div
                                                    className={cn('h-full transition-all duration-1000', item.color)}
                                                    style={{ width: `${Math.min((item.stock / 150) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                        <button className='p-2 hover:bg-white rounded-xl transition-all cursor-pointer'>
                                            <ArrowRight size={18} className='text-gray-300' />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='space-y-6'>
                    <div className='bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm'>
                        <h3 className='text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6'>Kategoriyalar</h3>
                        <div className='space-y-4'>
                            {['T-Shirts', 'Outerwear', 'Shoes', 'Pants'].map((cat) => (
                                <div key={cat} className='flex justify-between items-center text-xs font-bold uppercase'>
                                    <span className='text-gray-500'>{cat}</span>
                                    <span className='w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center font-black'>12</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
