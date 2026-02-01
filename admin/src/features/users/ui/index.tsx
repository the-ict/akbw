'use client';

import React from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    Calendar,
    ShoppingBag,
    Star,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

const customers = [
    {
        id: '1',
        name: 'Davlatbek Erkinov',
        email: 'davlat@example.com',
        phone: '+998 90 123 45 67',
        orders: 12,
        spent: '$2,450.00',
        joined: 'Jan 12, 2024',
        status: 'Active',
    },
    {
        id: '2',
        name: 'Nilufar Rahimova',
        email: 'nilufar@example.com',
        phone: '+998 99 888 77 66',
        orders: 5,
        spent: '$890.00',
        joined: 'Feb 01, 2024',
        status: 'Active',
    },
    {
        id: '3',
        name: 'Omon Giyasov',
        email: 'omon@example.com',
        phone: '+998 91 555 44 33',
        orders: 1,
        spent: '$45.00',
        joined: 'Mar 15, 2024',
        status: 'Inactive',
    },
];

export default function Customers() {
    return (
        <div className='space-y-6'>
            <div>
                <h1 className='text-2xl font-black uppercase tracking-tight'>Mijozlar</h1>
                <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Foydalanuvchilar va ularning buyurtmalar tarixi</p>
            </div>

            {/* Stats Summary */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='bg-black text-white p-6 rounded-[24px] shadow-xl shadow-black/10'>
                    <div className='flex justify-between items-start mb-4'>
                        <div className='p-3 bg-white/10 rounded-2xl'>
                            <Star size={20} className='text-yellow-400' />
                        </div>
                    </div>
                    <h3 className='text-white/40 text-[10px] font-black uppercase tracking-widest mb-1'>Sodiq Mijozlar</h3>
                    <p className='text-2xl font-black'>145 ta</p>
                </div>
                <div className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm'>
                    <h3 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1'>O‘rtacha Chek</h3>
                    <p className='text-2xl font-black'>$124.00</p>
                </div>
                <div className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm'>
                    <h3 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1'>Yangi Foydalanuvchilar</h3>
                    <p className='text-2xl font-black'>+24 <span className='text-xs text-green-500 ml-2'>bu oy</span></p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className='bg-white p-4 rounded-[24px] border border-gray-100 flex flex-col md:flex-row gap-4 items-center shadow-sm'>
                <div className='relative flex-1 w-full'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                    <Input
                        placeholder='Mijoz ismini yoki tel raqamini qidiring...'
                        className='pl-12 h-12 bg-gray-50 border-none rounded-2xl text-sm focus-visible:ring-1 focus-visible:ring-black/5'
                    />
                </div>
                <Button variant='outline' className='rounded-2xl border-gray-100 h-12 px-6 flex items-center gap-2 font-bold text-xs uppercase cursor-pointer'>
                    <Filter size={16} />
                    Saralash
                </Button>
            </div>

            {/* Customers List */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {customers.map((customer) => (
                    <div key={customer.id} className='bg-white p-6 rounded-[32px] border border-gray-100 hover:shadow-xl hover:shadow-black/5 transition-all group cursor-pointer'>
                        <div className='flex justify-between items-start mb-6'>
                            <div className='flex items-center gap-4'>
                                <div className='w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-xl overflow-hidden'>
                                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.name}`} alt="avatar" />
                                </div>
                                <div>
                                    <h4 className='font-black uppercase tracking-tight'>{customer.name}</h4>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <span className={cn(
                                            'w-2 h-2 rounded-full',
                                            customer.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'
                                        )} />
                                        <span className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{customer.status}</span>
                                    </div>
                                </div>
                            </div>
                            <button className='p-2 hover:bg-gray-50 rounded-xl transition-all'>
                                <MoreHorizontal size={20} className='text-gray-400' />
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-4 mb-6'>
                            <div className='space-y-3'>
                                <div className='flex items-center gap-2 text-xs text-gray-500 font-medium'>
                                    <Mail size={14} className='text-gray-300' />
                                    {customer.email}
                                </div>
                                <div className='flex items-center gap-2 text-xs text-gray-500 font-medium'>
                                    <Phone size={14} className='text-gray-300' />
                                    {customer.phone}
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <div className='flex items-center gap-2 text-xs text-gray-500 font-medium'>
                                    <Calendar size={14} className='text-gray-300' />
                                    {customer.joined}
                                </div>
                                <div className='flex items-center gap-2 text-xs text-gray-500 font-medium'>
                                    <ShoppingBag size={14} className='text-gray-300' />
                                    {customer.orders} ta buyurtma
                                </div>
                            </div>
                        </div>

                        <div className='p-4 bg-gray-50 rounded-2xl flex justify-between items-center'>
                            <div>
                                <p className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>Umumiy sarf</p>
                                <p className='text-lg font-black tracking-tight'>{customer.spent}</p>
                            </div>
                            <Button variant='outline' className='rounded-xl h-10 px-4 bg-white border-none shadow-sm text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer'>
                                Tarixni ko‘rish
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
