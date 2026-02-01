'use client';

import React from 'react';
import Sidebar from '@/widgets/sidebar/ui';
import Header from '@/widgets/header/ui';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-h-screen bg-[#fafafa] flex overflow-hidden'>
            {/* Sidebar padding for fixed position */}
            <div className='hidden md:block w-[280px] shrink-0' />
            <Sidebar />

            <div className='flex-1 flex flex-col min-w-0'>
                <Header />
                <main className='flex-1 p-8 overflow-y-auto no-scrollbar'>
                    {children}
                </main>
            </div>
        </div>
    );
}
