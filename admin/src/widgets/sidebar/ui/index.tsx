'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    BarChart3,
    CreditCard,
    Box,
    Image as ImageIcon,
    ShieldCheck,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Layers,
    Headphones,
    HelpCircle,
    Bell,
    CloudSun,
} from 'lucide-react';
import { useAdminAuthStore } from '@/shared/store/auth.store';

const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Mahsulotlar', icon: Package, href: '/products' },
    { name: 'Kategoriyalar', icon: Layers, href: '/categories' },
    { name: 'Buyurtmalar', icon: ShoppingBag, href: '/orders' },
    { name: 'Bildirishnomalar', icon: Bell, href: '/notifications' },
    { name: 'Fasllar', icon: CloudSun, href: '/styles' },
    { name: 'Mijozlar', icon: Users, href: '/users' },
    { name: 'Statistika', icon: BarChart3, href: '/statistics' },
    { name: 'To‘lovlar', icon: CreditCard, href: '/payments' },
    // { name: 'Ombor', icon: Box, href: '/inventory' },
    { name: 'Yordam', icon: Headphones, href: '/support' },
    { name: 'Mahsulot So\'rovi', icon: HelpCircle, href: '/product-support' },
    // { name: 'Kontent', icon: ImageIcon, href: '/content-managment' },
    { name: 'Rollar', icon: ShieldCheck, href: '/users-roles' },
    // { name: 'Sozlamalar', icon: Settings, href: '/settings' },
];

export default function Sidebar() {

    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    // Extract locale from pathname (e.g., /uz/dashboard -> /dashboard)
    const getPathWithoutLocale = (path: string) => {
        const parts = path.split('/');
        if (parts.length > 2) {
            return '/' + parts.slice(2).join('/');
        }
        return path;
    };

    const currentPath = getPathWithoutLocale(pathname);
    const { logout } = useAdminAuthStore();

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-50 flex flex-col',
                isCollapsed ? 'w-[80px]' : 'w-[280px]'
            )}
        >
            {/* Logo Section */}
            <div className='p-6 mb-4 flex items-center justify-between'>
                {!isCollapsed && (
                    <span className='text-2xl font-black uppercase tracking-tighter'>
                        AKBW<span className='text-gray-400 font-medium'>.Admin</span>
                    </span>
                )}
                {isCollapsed && (
                    <span className='text-xl font-black uppercase tracking-tighter mx-auto'>
                        AK
                    </span>
                )}
            </div>

            {/* Nav Items */}
            <nav className='flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar'>
                {sidebarItems.map((item) => {
                    const isActive = currentPath === item.href || (currentPath === '' && item.href === '/dashboard');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={`/uz${item.href}`} // Fixed to use modern routing pattern or just locale-aware Link
                            className={cn(
                                'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group',
                                isActive
                                    ? 'bg-black text-white shadow-lg shadow-black/10'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                            )}
                        >
                            <Icon
                                size={22}
                                className={cn(
                                    'shrink-0 transition-transform duration-200 group-hover:scale-110',
                                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-black'
                                )}
                            />
                            {!isCollapsed && (
                                <span className='font-bold text-sm uppercase tracking-wider'>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className='p-4 border-t border-gray-50 space-y-2'>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className='w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-black transition-colors rounded-xl hover:bg-gray-50 cursor-pointer'
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {!isCollapsed && <span className='text-sm font-medium'>Collapse</span>}
                </button>

                <button onClick={logout} className='w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 transition-all rounded-xl cursor-pointer'>
                    <LogOut size={20} />
                    {!isCollapsed && <span className='text-sm font-bold uppercase tracking-wider'>Logout</span>}
                </button>
            </div>
        </aside>
    );
}
