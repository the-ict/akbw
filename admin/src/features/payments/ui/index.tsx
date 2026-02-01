'use client';

import React from 'react';
import {
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Search,
    Filter,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

const transactions = [
    { id: 'T-9201', order: '#820475', customer: 'Davlatbek E.', amount: '$467.00', method: 'Click', status: 'Succeeded', date: 'Bugun, 14:20' },
    { id: 'T-9202', order: '#820476', customer: 'Anvar T.', amount: '$120.00', method: 'Payme', status: 'Succeeded', date: 'Bugun, 11:45' },
    { id: 'T-9203', order: '#820477', customer: 'Sardor R.', amount: '$890.00', method: 'Refunded', status: 'Refunded', date: 'Kecha, 18:30' },
    { id: 'T-9204', order: '#820478', customer: 'Jasur M.', amount: '$230.00', method: 'Click', status: 'Pending', date: 'Kecha, 09:15' },
];

export default function Payments() {
    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-black uppercase tracking-tight'>To‘lovlar</h1>
                    <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Tranzaksiyalar va moliyaviy oqim boshqaruvi</p>
                </div>
                <Button className='rounded-2xl bg-white text-black border border-gray-100 px-6 py-4 h-auto font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-all cursor-pointer'>
                    <Download size={16} />
                    Export CSV
                </Button>
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm'>
                    <div className='flex justify-between items-start mb-4'>
                        <div className='p-3 bg-green-50 text-green-600 rounded-2xl'>
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                    <h3 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1'>Tushum (Haftalik)</h3>
                    <p className='text-2xl font-black'>$12,450.00</p>
                </div>
                <div className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm'>
                    <div className='flex justify-between items-start mb-4'>
                        <div className='p-3 bg-red-50 text-red-600 rounded-2xl'>
                            <ArrowDownRight size={20} />
                        </div>
                    </div>
                    <h3 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1'>Vozvratlar (Qaytarilgan)</h3>
                    <p className='text-2xl font-black'>$890.00</p>
                </div>
                <div className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm'>
                    <div className='flex justify-between items-start mb-4'>
                        <div className='p-3 bg-blue-50 text-blue-600 rounded-2xl'>
                            <CreditCard size={20} />
                        </div>
                    </div>
                    <h3 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1'>Kutilayotgan to‘lovlar</h3>
                    <p className='text-2xl font-black'>$230.00</p>
                </div>
            </div>

            {/* Transactions Table */}
            <div className='bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm'>
                <div className='p-6 border-b border-gray-50 flex gap-4 items-center'>
                    <div className='relative flex-1'>
                        <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                        <Input placeholder='Search transactions...' className='pl-12 h-11 bg-gray-50 border-none rounded-xl text-sm' />
                    </div>
                    <Button variant='outline' className='rounded-xl border-gray-100 h-11 px-4 cursor-pointer'>
                        <Filter size={18} />
                    </Button>
                </div>
                <div className='overflow-x-auto no-scrollbar'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-gray-50/50'>
                                <th className='px-8 py-4 text-left text-[10px] uppercase tracking-widest font-black text-gray-400'>Tranzaksiya</th>
                                <th className='px-8 py-4 text-left text-[10px] uppercase tracking-widest font-black text-gray-400'>Mijoz / Order</th>
                                <th className='px-8 py-4 text-left text-[10px] uppercase tracking-widest font-black text-gray-400'>Summa</th>
                                <th className='px-8 py-4 text-left text-[10px] uppercase tracking-widest font-black text-gray-400'>Method</th>
                                <th className='px-8 py-4 text-left text-[10px] uppercase tracking-widest font-black text-gray-400'>Status</th>
                                <th className='px-8 py-4 text-left text-[10px] uppercase tracking-widest font-black text-gray-400'>Sana</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-50'>
                            {transactions.map((t) => (
                                <tr key={t.id} className='hover:bg-gray-50/50 transition-all'>
                                    <td className='px-8 py-5'>
                                        <p className='text-sm font-black uppercase'>{t.id}</p>
                                    </td>
                                    <td className='px-8 py-5'>
                                        <p className='text-sm font-bold uppercase'>{t.customer}</p>
                                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{t.order}</p>
                                    </td>
                                    <td className='px-8 py-5'>
                                        <p className='text-sm font-black'>{t.amount}</p>
                                    </td>
                                    <td className='px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest'>
                                        {t.method}
                                    </td>
                                    <td className='px-8 py-5'>
                                        <span className={cn(
                                            'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border',
                                            t.status === 'Succeeded' ? 'bg-green-50 text-green-600 border-green-100' :
                                                t.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    'bg-red-50 text-red-600 border-red-100'
                                        )}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className='px-8 py-5 text-xs text-gray-400 font-bold uppercase'>
                                        {t.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
