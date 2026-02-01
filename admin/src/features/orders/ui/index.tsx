'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Truck,
    Package,
    CheckCircle2,
    XCircle,
    Copy,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import OrderDetailModal from './order-detail-modal';

// Mock Data
const orders = [
    {
        id: '820475',
        customer: 'Davlatbek Erkinov',
        phone: '+998 90 123 45 67',
        address: 'Toshkent shahri, Olmazor tumani',
        payment: 'Click',
        total: '$467.00',
        date: 'Bugun, 14:20',
        status: 'Yangi',
    },
    {
        id: '820476',
        customer: 'Anvar Toshmatov',
        phone: '+998 99 888 77 66',
        address: 'Samarqand shahri, Markaz',
        payment: 'Payme',
        total: '$120.00',
        date: 'Bugun, 11:45',
        status: 'Qabul qilindi',
    },
    {
        id: '820477',
        customer: 'Sardor Rahimzoda',
        phone: '+998 91 555 44 33',
        address: 'Buxoro viloyati, Gijduvon',
        payment: 'Naqd',
        total: '$890.00',
        date: 'Kecha, 18:30',
        status: 'Yuborildi',
    },
    {
        id: '820478',
        customer: 'Jasur Mavlonov',
        phone: '+998 77 333 22 11',
        address: 'Toshkent shahri, Chilonzor',
        payment: 'Click',
        total: '$230.00',
        date: 'Kecha, 09:15',
        status: 'Yetkazildi',
    },
    {
        id: '820479',
        customer: 'Abror Alimov',
        phone: '+998 90 999 00 11',
        address: 'Andijon shahri',
        payment: 'Payme',
        total: '$45.00',
        date: '01.02.2026',
        status: 'Bekor qilindi',
    },
];

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'Yangi': return 'bg-blue-50 text-blue-600 border-blue-100';
        case 'Qabul qilindi': return 'bg-orange-50 text-orange-600 border-orange-100';
        case 'Yuborildi': return 'bg-purple-50 text-purple-600 border-purple-100';
        case 'Yetkazildi': return 'bg-green-50 text-green-600 border-green-100';
        case 'Bekor qilindi': return 'bg-red-50 text-red-600 border-red-100';
        default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
};

export default function Orders() {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleViewOrder = (order: any) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    };

    return (
        <div className='space-y-6 pb-10'>
            {/* Header */}
            <div>
                <h1 className='text-2xl font-black uppercase tracking-tight'>Buyurtmalar</h1>
                <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Savdo jarayonini kuzatish va boshqarish</p>
            </div>

            {/* Quick Status Filters */}
            <div className='flex gap-4 overflow-x-auto no-scrollbar py-2'>
                {['Hammasi', 'Yangi', 'Qabul qilindi', 'Yuborildi', 'Yetkazildi', 'Bekor qilindi'].map((tab, i) => (
                    <button
                        key={tab}
                        className={cn(
                            'px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0',
                            i === 0 ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 hover:border-black hover:text-black'
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <OrderDetailModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                order={selectedOrder}
            />

            {/* Orders Table */}
            <div className='bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm'>
                <div className='overflow-x-auto no-scrollbar'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-gray-50/50 border-b border-gray-100'>
                                <th className='px-8 py-5 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Buyurtma ID
                                </th>
                                <th className='px-8 py-5 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Mijoz
                                </th>
                                <th className='px-8 py-5 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Manzil
                                </th>
                                <th className='px-8 py-5 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Summa / To‘lov
                                </th>
                                <th className='px-8 py-5 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Status
                                </th>
                                <th className='px-8 py-5 text-right text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Amallar
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-50'>
                            {orders.map((order) => (
                                <tr key={order.id} className='hover:bg-gray-50/50 transition-colors group'>
                                    <td className='px-8 py-6'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-sm font-black'>#{order.id}</span>
                                            <button className='p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors'>
                                                <Copy size={12} />
                                            </button>
                                        </div>
                                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>{order.date}</p>
                                    </td>
                                    <td className='px-8 py-6'>
                                        <p className='text-sm font-bold uppercase'>{order.customer}</p>
                                        <p className='text-xs text-gray-500 font-medium'>{order.phone}</p>
                                    </td>
                                    <td className='px-8 py-6 max-w-[200px]'>
                                        <p className='text-xs text-gray-600 font-medium truncate'>{order.address}</p>
                                    </td>
                                    <td className='px-8 py-6'>
                                        <p className='text-sm font-black'>{order.total}</p>
                                        <span className='text-[10px] font-bold uppercase tracking-widest text-gray-400'>{order.payment}</span>
                                    </td>
                                    <td className='px-8 py-6'>
                                        <div className={cn(
                                            'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border',
                                            getStatusStyles(order.status)
                                        )}>
                                            <span className='w-1.5 h-1.5 rounded-full bg-current' />
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className='px-8 py-6 text-right'>
                                        <div className='flex items-center justify-end gap-2'>
                                            <button
                                                onClick={() => handleViewOrder(order)}
                                                className='p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-black hover:text-white transition-all cursor-pointer'
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className='p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:border-black hover:text-black transition-all cursor-pointer'>
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className='rounded-2xl border-gray-100 p-2 shadow-xl'>
                                                    <DropdownMenuLabel className='text-[10px] uppercase tracking-widest font-black text-gray-400 px-3 py-2'>Statusni o‘zgartirish</DropdownMenuLabel>
                                                    <DropdownMenuItem className='rounded-xl gap-3 px-3 py-2 cursor-pointer'>
                                                        <Package size={16} className='text-orange-500' />
                                                        <span className='text-xs font-bold uppercase tracking-wider'>Qabul qilish</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className='rounded-xl gap-3 px-3 py-2 cursor-pointer'>
                                                        <Truck size={16} className='text-purple-500' />
                                                        <span className='text-xs font-bold uppercase tracking-wider'>Yuborish</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className='rounded-xl gap-3 px-3 py-2 cursor-pointer'>
                                                        <CheckCircle2 size={16} className='text-green-500' />
                                                        <span className='text-xs font-bold uppercase tracking-wider'>Yetkazildi</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className='bg-gray-50' />
                                                    <DropdownMenuItem className='rounded-xl gap-3 px-3 py-2 text-red-500 hover:bg-red-50 cursor-pointer'>
                                                        <XCircle size={16} />
                                                        <span className='text-xs font-bold uppercase tracking-wider'>Bekor qilish</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
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

// Utility
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
