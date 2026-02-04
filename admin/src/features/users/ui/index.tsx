'use client';

import React from 'react';
import {
    Search,
    Filter,
    Phone,
    Calendar,
    ShoppingBag,
    Star,
} from 'lucide-react';
import {
    Button
} from '@/shared/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import UserHistoryModal from './user-history-modal';
import { Input } from '@/shared/ui/input';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/shared/config/api/user.request';

interface User {
    id: string;
    name: string;
    lastName: string;
    phone: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
}

export default function Customers() {
    const { data: users = [], isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers
    });

    const [searchQuery, setSearchQuery] = React.useState('');
    const [sortBy, setSortBy] = React.useState('Eng so‘nggi');
    const [selectedUser, setSelectedUser] = React.useState<any | null>(null);
    const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

    const handleViewHistory = (user: any) => {
        setSelectedUser(user);
        setIsHistoryOpen(true);
    };

    const customers = React.useMemo(() => {
        return users.map(user => ({
            id: user.id,
            name: `${user.name} ${user.lastName}`,
            phone: user.phone,
            orders: 0,
            spent: '$0.00',
            joined: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            status: 'Active',
        }));
    }, [users]);

    const filteredAndSortedCustomers = React.useMemo(() => {
        let result = customers.filter(customer =>
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery)
        );

        if (sortBy === 'Ism bo‘yicha (A-Z)') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'Xaridlar soni') {
            result.sort((a, b) => b.orders - a.orders);
        }

        return result;
    }, [searchQuery, sortBy, customers]);

    const stats = React.useMemo(() => {
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        const newThisMonth = users.filter(u => {
            const d = new Date(u.createdAt);
            return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
        }).length;

        return {
            total: users.length,
            newThisMonth
        };
    }, [users]);

    if (isLoading) return <div className="p-10 text-center">Yuklanmoqda...</div>;

    return (
        <div className='space-y-6'>
            <div>
                <h1 className='text-2xl font-black uppercase tracking-tight'>Mijozlar</h1>
                <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Foydalanuvchilar va ularning buyurtmalar tarixi ({stats.total} ta)</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='bg-black text-white p-6 rounded-[24px] shadow-xl shadow-black/10'>
                    <div className='flex justify-between items-start mb-4'>
                        <div className='p-3 bg-white/10 rounded-2xl'>
                            <Star size={20} className='text-yellow-400' />
                        </div>
                    </div>
                    <h3 className='text-white/40 text-[10px] font-black uppercase tracking-widest mb-1'>Sodiq Mijozlar</h3>
                    <p className='text-2xl font-black'>{stats.total} ta</p>
                </div>
                <div className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm'>
                    <h3 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1'>O‘rtacha Chek</h3>
                    <p className='text-2xl font-black'>$0.00</p>
                </div>
                <div className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm'>
                    <h3 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1'>Yangi Foydalanuvchilar</h3>
                    <p className='text-2xl font-black'>+{stats.newThisMonth} <span className='text-xs text-green-500 ml-2'>bu oy</span></p>
                </div>
            </div>

            <div className='bg-white p-4 rounded-[24px] border border-gray-100 flex flex-col md:flex-row gap-4 items-center shadow-sm'>
                <div className='relative flex-1 w-full'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                    <Input
                        placeholder='Mijoz ismini yoki tel raqamini qidiring...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pl-12 h-12 bg-gray-50 border-none rounded-2xl text-sm focus-visible:ring-1 focus-visible:ring-black/5'
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='rounded-2xl border-gray-100 h-12 px-6 flex items-center gap-2 font-bold text-xs uppercase cursor-pointer transition-all hover:bg-black hover:text-white'>
                            <Filter size={16} />
                            {sortBy === 'Eng so‘nggi' ? 'Saralash' : sortBy}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='rounded-2xl border-gray-100 p-2 shadow-xl min-w-[200px]'>
                        <DropdownMenuLabel className='text-[10px] uppercase tracking-widest font-black text-gray-400 px-3 py-2'>Saralash usuli</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSortBy('Eng so‘nggi')} className='rounded-xl px-3 py-2 cursor-pointer text-xs font-bold uppercase'>Eng so‘nggi</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('Ism bo‘yicha (A-Z)')} className='rounded-xl px-3 py-2 cursor-pointer text-xs font-bold uppercase'>Ism bo‘yicha (A-Z)</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('Xaridlar soni')} className='rounded-xl px-3 py-2 cursor-pointer text-xs font-bold uppercase'>Xaridlar soni</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {filteredAndSortedCustomers.map((customer) => (
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
                        </div>

                        <div className='grid grid-cols-2 gap-4 mb-6'>
                            <div className='space-y-3'>
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
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewHistory(customer);
                                }}
                                variant='outline'
                                className='rounded-xl h-10 px-4 bg-white border-none shadow-sm text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer'
                            >
                                Tarixni ko‘rish
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <UserHistoryModal
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                user={selectedUser}
            />
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
