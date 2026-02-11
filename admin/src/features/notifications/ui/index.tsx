'use client';

import React from 'react';
import {
    Plus,
    Search,
    Trash2,
    Bell,
    Clock,
    X,
    Send,
    Loader2
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationRequest, ICreateNotificationRequest } from '@/shared/config/api/notification/notification.request';
import { toast } from 'sonner';

export default function Notifications() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [message, setMessage] = React.useState('');

    const { data: response, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: notificationRequest.getNotifications
    });

    const createMutation = useMutation({
        mutationFn: (data: ICreateNotificationRequest) => notificationRequest.createNotification(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            toast.success('Bildirishnoma yuborildi');
            handleCloseModal();
        },
        onError: () => {
            toast.error('Bildirishnoma yuborishda xatolik');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => notificationRequest.deleteNotification(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            toast.success('Bildirishnoma o‘chirildi');
        },
        onError: () => {
            toast.error('O‘chirishda xatolik');
        }
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTitle('');
        setMessage('');
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !message) {
            toast.error('Barcha maydonlarni to‘ldiring');
            return;
        }
        createMutation.mutate({ title, message });
    };

    const notifications = response?.data || [];

    const filteredNotifications = notifications.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return (
        <div className="flex items-center justify-center p-20">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
    );

    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-end'>
                <div>
                    <h1 className='text-3xl font-black uppercase tracking-tight'>Bildirishnomalar</h1>
                    <p className='text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1'>Tizim bo‘ylab umumiy xabarlarni boshqarish ({notifications.length} ta)</p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className='rounded-[18px] h-12 px-6 bg-black text-white hover:bg-black/90 shadow-lg shadow-black/10 flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                >
                    <Plus size={18} />
                    Yangi bildirishnoma
                </Button>
            </div>

            <div className='bg-white p-4 rounded-[28px] border border-gray-100 flex items-center gap-4 shadow-sm'>
                <div className='relative flex-1'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                    <Input
                        placeholder='Qidirish...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pl-12 h-14 bg-gray-50 border-none rounded-[20px] text-sm font-medium focus-visible:ring-1 focus-visible:ring-black/5'
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredNotifications.map((notif) => (
                    <div key={notif.id} className='bg-white p-6 rounded-[32px] border border-gray-100 hover:shadow-xl hover:shadow-black/5 transition-all group relative overflow-hidden'>
                        <div className='absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity'>
                            <button
                                onClick={() => {
                                    if (confirm('Rostdan ham o‘chirmoqchimisiz?')) deleteMutation.mutate(notif.id);
                                }}
                                className='p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer'
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className='flex items-start gap-4 mb-4'>
                            <div className='p-3 bg-gray-50 rounded-2xl'>
                                <Bell size={20} className='text-black' />
                            </div>
                            <div className='flex-1 pr-6'>
                                <h3 className='font-black text-sm uppercase tracking-tight line-clamp-1'>{notif.title}</h3>
                                <div className='flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                                    <Clock size={10} />
                                    {new Date(notif.createdAt).toLocaleDateString('uz-UZ', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        <div className='p-4 bg-gray-50 rounded-2xl'>
                            <p className='text-xs text-gray-500 leading-relaxed line-clamp-3 font-medium'>{notif.message}</p>
                        </div>
                    </div>
                ))}

                {filteredNotifications.length === 0 && (
                    <div className='col-span-full py-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200'>
                        <Bell size={48} className='mx-auto text-gray-200 mb-4' />
                        <h3 className='font-black text-gray-400 uppercase tracking-widest'>Bildirishnomalar topilmadi</h3>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
                    <div className='bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300'>
                        <div className='p-8 pb-4 flex justify-between items-center'>
                            <div>
                                <h2 className='text-xl font-black uppercase tracking-tight'>Yangi xabar</h2>
                                <p className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>Foydalanuvchilarga bildirishnoma yuborish</p>
                            </div>
                            <button onClick={handleCloseModal} className='p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer'>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className='p-8 pt-4 space-y-6'>
                            <div className='space-y-2'>
                                <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1'>Sarlavha</label>
                                <Input
                                    placeholder='Sarlavhani kiriting...'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className='h-12 bg-gray-50 border-none rounded-2xl text-sm font-bold focus-visible:ring-1 focus-visible:ring-black/5'
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1'>Xabar matni</label>
                                <textarea
                                    placeholder='Xabarni kiriting...'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    className='w-full p-4 bg-gray-50 border-none rounded-[28px] text-sm font-medium resize-none focus:outline-none focus:ring-1 focus:ring-black/5'
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={createMutation.isPending}
                                className='w-full h-14 rounded-[24px] bg-black text-white hover:bg-black/90 font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2'
                            >
                                {createMutation.isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Bildirishnomani yuborish
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
