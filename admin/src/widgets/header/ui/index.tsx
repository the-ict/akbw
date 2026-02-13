'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, User } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { useAdminMe } from '../lib/hooks';

export default function Header() {
    const pathname = usePathname();

    const { data: admin, isLoading } = useAdminMe();
    console.log(admin, "admin");

    const getPageTitle = (path: string) => {
        const parts = path.split('/');
        const page = parts[parts.length - 1];
        if (!page || page === 'uz' || page === 'en') return 'Dashboard';
        return page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ');
    };

    if (!admin?.admin || isLoading) return null;
    return (
        <header className='h-[80px] border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/80'>
            <div>
                <h1 className='text-xl font-black uppercase tracking-wider'>
                    {getPageTitle(pathname)}
                </h1>
                <div className='flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold'>
                    <span>Admin</span>
                    <span className='w-1 h-1 rounded-full bg-gray-200' />
                    <span className='text-black'>{getPageTitle(pathname)}</span>
                </div>
            </div>

            <div className='hidden md:flex relative w-[300px]'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                <Input
                    placeholder='Search anything...'
                    className='pl-10 h-10 bg-gray-50 border-none rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-black/5'
                />
            </div>

            <div className='flex items-center gap-4'>
                <div className='w-[1px] h-8 bg-gray-100 mx-2' />
                <div className='flex items-center gap-3'>
                    <div className='text-right hidden sm:block'>
                        <p className='text-sm font-bold uppercase tracking-tight'>{admin?.admin?.name}</p>
                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{admin?.admin?.phone}</p>
                    </div>
                    <div className='w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-lg shadow-black/10'>
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}
