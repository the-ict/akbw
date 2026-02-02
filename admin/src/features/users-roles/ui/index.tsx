'use client';

import React from 'react';
import {
    ShieldCheck,
    ShieldAlert,
    Shield,
    UserPlus,
    MoreVertical,
    Lock,
    Unlock,
    Activity,
    Trash2,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import AddUserModal from './add-user-modal';
import CredentialsModal from './credentials-modal';

const initialRoles = [
    {
        id: '1',
        name: 'Davlatbek Erkinov',
        role: 'Admin',
        permissions: ['Barcha huquqlar', 'Moliyaviy hisobotlar', 'Foydalanuvchi boshqaruvi'],
        lastActive: 'Hozir faol',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        color: 'bg-black',
        icon: ShieldCheck,
    },
    {
        id: '2',
        name: 'Anvar Toshmatov',
        role: 'Manager',
        permissions: ['Mahsulotlar', 'Buyurtmalar', 'Mijozlar'],
        lastActive: '2 soat oldin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manager',
        color: 'bg-blue-600',
        icon: Shield,
    },
    {
        id: '3',
        name: 'Nilufar Rahimova',
        role: 'Content',
        permissions: ['Mahsulotlar', 'Bannerlar', 'Blog'],
        lastActive: 'Bugun, 09:30',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Content',
        color: 'bg-purple-600',
        icon: ShieldAlert,
    },
];

export default function UsersRoles() {
    const [users, setUsers] = React.useState(initialRoles);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [createdCredentials, setCreatedCredentials] = React.useState<{ login: string, pass: string } | null>(null);

    const handleAddUser = (newUser: any) => {
        const user = {
            id: Math.random().toString(),
            ...newUser,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUser.name}`,
            color: 'bg-gray-900',
            icon: Shield,
        };
        setUsers([...users, user]);
        setIsAddModalOpen(false);
        setCreatedCredentials({ login: newUser.login, pass: newUser.pass });
    };

    const handleRemoveUser = (userId: string) => {
        setUsers(users.filter(u => u.id !== userId));
    };

    return (
        <div className='space-y-8'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-black uppercase tracking-tight'>Foydalanuvchilar va Rollar</h1>
                    <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Admin panelga kirish huquqlarini boshqarish</p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className='rounded-2xl bg-black text-white px-6 py-6 h-auto font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95 cursor-pointer'
                >
                    <UserPlus size={18} />
                    Yangi User Qo‘shish
                </Button>
            </div>

            {/* Role Summary Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {users.map((user, i) => {
                    const Icon = user.icon;
                    return (
                        <div key={i} className='bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all relative overflow-hidden group'>
                            <div className={cn('absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-8 -mt-8 transition-transform group-hover:scale-110', user.color)}>
                                <Icon size={128} />
                            </div>

                            <div className='flex flex-col items-center text-center mb-8'>
                                <div className='w-24 h-24 rounded-3xl bg-gray-50 p-1 border-2 border-gray-50 mb-4 relative'>
                                    <div className='w-full h-full rounded-2xl overflow-hidden'>
                                        <img src={user.avatar} alt={user.name} className='w-full h-full object-cover' />
                                    </div>
                                    <div className={cn('absolute -bottom-2 -right-2 p-2 rounded-xl text-white shadow-lg', user.color)}>
                                        <Icon size={16} />
                                    </div>
                                </div>
                                <h3 className='font-black uppercase tracking-tight text-lg'>{user.name}</h3>
                                <span className={cn('text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mt-2 text-white', user.color)}>
                                    {user.role}
                                </span>
                            </div>

                            <div className='space-y-4'>
                                <div className='flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50 pb-2'>
                                    <span>Huquqlar</span>
                                    <Lock size={12} />
                                </div>
                                <div className='flex flex-wrap gap-2'>
                                    {user.permissions.map(p => (
                                        <span key={p} className='px-3 py-1.5 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-500'>
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className='mt-8 pt-6 border-t border-gray-50 flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Activity size={14} className='text-green-500' />
                                    <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>{user.lastActive}</span>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className='p-2 hover:bg-gray-50 rounded-xl transition-all cursor-pointer'>
                                            <MoreVertical size={18} className='text-gray-400' />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className='rounded-2xl border-gray-100 p-2 shadow-xl'>
                                        <DropdownMenuItem
                                            onClick={() => handleRemoveUser(user.id)}
                                            className='rounded-xl gap-3 px-3 py-2 text-red-500 hover:bg-red-50 cursor-pointer'
                                        >
                                            <Trash2 size={16} />
                                            <span className='text-xs font-bold uppercase tracking-wider'>O‘chirish</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Activity Log Section */}
            <div className='bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm'>
                <h2 className='text-lg font-black uppercase tracking-wider mb-8'>Xavfsizlik Jurnali (Activity Log)</h2>
                <div className='space-y-6'>
                    {[
                        { action: 'Mahsulot tahrirlandi', user: 'Anvar Toshmatov', time: '12 daqiqa oldin', code: 'PROD-1293' },
                        { action: 'Yangi buyurtma qabul qilindi', user: 'System', time: '25 daqiqa oldin', code: 'ORD-8204' },
                        { action: 'Narxlar o‘zgartirildi', user: 'Davlatbek Erkinov', time: '1 soat oldin', code: 'SET-9901' },
                        { action: 'Profil rasm o‘zgartirildi', user: 'Nilufar Rahimova', time: '3 soat oldin', code: 'USR-0012' },
                    ].map((log, i) => (
                        <div key={i} className='flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 px-4 rounded-2xl transition-all cursor-pointer'>
                            <div className='flex items-center gap-4'>
                                <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>
                                    <Unlock size={18} className='text-gray-400' />
                                </div>
                                <div>
                                    <p className='text-sm font-bold uppercase'>{log.action}</p>
                                    <p className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>{log.user} • {log.time}</p>
                                </div>
                            </div>
                            <span className='text-[10px] font-black uppercase tracking-widest border border-gray-200 px-3 py-1 rounded-lg text-gray-400'>
                                {log.code}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <AddUserModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddUser}
            />

            <CredentialsModal
                isOpen={!!createdCredentials}
                onClose={() => setCreatedCredentials(null)}
                credentials={createdCredentials}
            />
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
