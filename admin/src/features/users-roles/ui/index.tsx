'use client';

import React from 'react';
import {
    ShieldCheck,
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
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import AddUserModal from './add-user-modal';
import CredentialsModal from './credentials-modal';
import { useAdmins, useDeleteAdmin } from '../lib/hooks';

export default function UsersRoles() {
    const { data: admins = [], isLoading } = useAdmins();
    const deleteAdminMutation = useDeleteAdmin();
    const [isAddUserOpen, setIsAddUserOpen] = React.useState(false);
    const [credentials, setCredentials] = React.useState<{ name: string; phone: string; token: string } | null>(null);

    const onAddUser = (user: any, token: string) => {
        setCredentials({
            name: `${user.name} ${user.lastName}`,
            phone: user.phone,
            token: token
        });
    };

    if (isLoading) {
        return (
            <div className='h-[400px] flex items-center justify-center'>
                <p className='text-gray-400 font-bold animate-pulse'>Yuklanmoqda...</p>
            </div>
        );
    }

    return (
        <div className='space-y-8'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-black uppercase tracking-tight'>Foydalanuvchilar va Rollar</h1>
                    <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Admin panelga kirish huquqlarini boshqarish</p>
                </div>
                <Button
                    onClick={() => setIsAddUserOpen(true)}
                    className='rounded-2xl bg-black text-white px-6 py-6 h-auto font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95 cursor-pointer'
                >
                    <UserPlus size={18} />
                    Yangi User Qo‘shish
                </Button>
            </div>

            {/* Role Summary Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {admins.map((user: any) => {
                    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`;
                    const color = user.role === 'Admin' ? 'bg-black' : 'bg-blue-600';
                    const Icon = user.role === 'Admin' ? ShieldCheck : Shield;

                    return (
                        <div key={user.id} className='bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all relative overflow-hidden group'>
                            <div className={cn('absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-8 -mt-8 transition-transform group-hover:scale-110', color)}>
                                <Icon size={128} />
                            </div>

                            <div className='flex flex-col items-center text-center mb-8'>
                                <div className='w-24 h-24 rounded-3xl bg-gray-50 p-1 border-2 border-gray-50 mb-4 relative'>
                                    <div className='w-full h-full rounded-2xl overflow-hidden'>
                                        <img src={avatar} alt={user.name} className='w-full h-full object-cover' />
                                    </div>
                                    <div className={cn('absolute -bottom-2 -right-2 p-2 rounded-xl text-white shadow-lg', color)}>
                                        <Icon size={16} />
                                    </div>
                                </div>
                                <h3 className='font-black uppercase tracking-tight text-lg'>
                                    {user.name} {user.lastName || ''}
                                </h3>
                                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2'>
                                    {user.phone || ''}
                                </p>
                                <span className={cn('text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full text-white', color)}>
                                    {user.role}
                                </span>
                            </div>

                            <div className='space-y-4'>
                                <div className='flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50 pb-2'>
                                    <span>Huquqlar</span>
                                    <Lock size={12} />
                                </div>
                                <div className='flex flex-wrap gap-2'>
                                    {user.access?.map((a: any) => (
                                        <span key={a.id} className='px-3 py-1.5 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-widest'>
                                            {a.name}
                                        </span>
                                    ))}
                                </div>
                            </div>


                            <div className='mt-8 pt-6 border-t border-gray-50 flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Activity size={14} className='text-green-500' />
                                    <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Hozir faol</span>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className='p-2 hover:bg-gray-50 rounded-xl transition-all cursor-pointer text-gray-400'>
                                            <MoreVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className='rounded-2xl border-gray-100 p-2 shadow-xl bg-white'>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                if (window.confirm("Rostdan ham ushbu adminni o'chirmoqchimisiz?")) {
                                                    deleteAdminMutation.mutate(user.id);
                                                }
                                            }}
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
                isOpen={isAddUserOpen}
                onClose={() => setIsAddUserOpen(false)}
                onAdd={onAddUser}
            />

            <CredentialsModal
                isOpen={!!credentials}
                onClose={() => setCredentials(null)}
                credentials={credentials}
            />
        </div>
    );
}

