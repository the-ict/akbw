'use client';

import React, {
    useState,
    useEffect
} from 'react';
import {
    Search,
    MoreVertical,
    Send,
    User,
    CheckCircle2,
    Inbox,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
    useAdminHelpChats,
    useAdminSendMessage
} from '../../chat/lib/hooks';


export default function SupportChat() {
    const { data: chats = [], isLoading } = useAdminHelpChats();
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [message, setMessage] = useState('');

    const selectedChat = chats.find((c: any) => c.id === selectedChatId) || chats[0];

    const sendMessageMutation = useAdminSendMessage('help');

    const handleSend = async () => {
        if (!message.trim() || !selectedChat) return;
        try {
            await sendMessageMutation.mutateAsync({
                chat_id: selectedChat.id,
                message: message.trim()
            });
            setMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (chats.length > 0 && selectedChatId === null) {
            setSelectedChatId(chats[0].id);
        }
    }, [chats, selectedChatId]);

    if (isLoading) {
        return (
            <div className='flex h-[calc(100vh-140px)] items-center justify-center bg-white rounded-[32px]'>
                <p className='text-gray-400 font-bold animate-pulse'>Yuklanmoqda...</p>
            </div>
        );
    }

    if (chats.length === 0) {
        return (
            <div className='flex h-[calc(100vh-140px)] items-center justify-center bg-white rounded-[32px]'>
                <div className='text-center'>
                    <Inbox size={48} className='mx-auto text-gray-200 mb-4' />
                    <p className='text-gray-400 font-bold'>Hozircha xabarlar yo'q</p>
                </div>
            </div>
        );
    }

    return (
        <div className='flex h-[calc(100vh-140px)] bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm'>
            <div className='w-[350px] border-r border-gray-100 flex flex-col'>
                <div className='p-6 border-b border-gray-50'>
                    <h2 className='text-xl font-black uppercase tracking-tight mb-4'>Xabarlar</h2>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                        <Input
                            placeholder='Qidirish...'
                            className='pl-10 rounded-xl bg-gray-50 border-none'
                        />
                    </div>
                </div>

                <div className='flex-1 overflow-y-auto no-scrollbar'>
                    {chats.map((chat: any) => (
                        <button
                            key={chat.id}
                            onClick={() => setSelectedChatId(chat.id)}
                            className={cn(
                                'w-full p-4 cursor-pointer flex gap-4 transition-all hover:bg-gray-50 text-left border-b border-gray-50/50',
                                selectedChat?.id === chat.id && 'bg-gray-50 border-l-4 border-black'
                            )}
                        >
                            <div className='relative shrink-0'>
                                <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
                                    <User size={24} className='text-gray-400' />
                                </div>
                            </div>
                            <div className='flex-1 min-w-0'>
                                <div className='flex justify-between items-start mb-1'>
                                    <h4 className='font-bold text-sm truncate'>{chat.user?.name || 'Foydalanuvchi'}</h4>
                                    <span className='text-[10px] text-gray-400 font-bold uppercase'>
                                        {chat.messages?.length > 0
                                            ? new Date(chat.messages[chat.messages.length - 1].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            : ''}
                                    </span>
                                </div>
                                <p className='text-xs text-gray-500 truncate'>
                                    {chat.messages?.length > 0 ? chat.messages[chat.messages.length - 1].message : 'Xabar yo\'q'}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selectedChat ? (
                <div className='flex-1 flex flex-col bg-gray-50/30'>
                    <div className='p-6 bg-white border-b border-gray-100 flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='w-10 h-10 rounded-full bg-black/5 flex items-center justify-center'>
                                <User size={20} className='text-black' />
                            </div>
                            <div>
                                <h3 className='font-bold text-base'>{selectedChat.user?.name || 'Foydalanuvchi'}</h3>
                                <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{selectedChat.user?.phone}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button variant='outline' size='sm' className='rounded-xl border-gray-100 text-[10px] font-black uppercase tracking-widest gap-2'>
                                <CheckCircle2 size={14} className='text-green-500' />
                                Yopish
                            </Button>
                            <button className='p-2 hover:bg-gray-50 rounded-xl transition-all'>
                                <MoreVertical size={20} className='text-gray-400' />
                            </button>
                        </div>
                    </div>

                    <div className='flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar flex flex-col-reverse'>
                        <div className='flex flex-col space-y-6'>
                            {selectedChat.messages?.map((msg: any) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        'flex flex-col max-w-[70%]',
                                        msg.admin_id ? 'ml-auto items-end' : 'mr-auto items-start'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'px-5 py-3 rounded-[20px] text-sm shadow-sm',
                                            msg.admin_id
                                                ? 'bg-black text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                        )}
                                    >
                                        {msg.message}
                                    </div>
                                    <span className='text-[10px] mt-2 text-gray-400 font-bold uppercase tracking-tighter'>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='p-6 bg-white border-t border-gray-100'>
                        <div className='flex gap-4 items-center bg-gray-50 pl-6 pr-2 py-2 rounded-2xl border border-gray-100 focus-within:border-black transition-all'>
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder='Xabar yozing...'
                                className='flex-1 bg-transparent border-none outline-none text-sm font-medium h-10'
                            />
                            <Button
                                onClick={handleSend}
                                className='rounded-xl bg-black hover:bg-black/90 px-6 h-10'
                                disabled={!message.trim() || sendMessageMutation.isPending}
                            >
                                <Send size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex-1 flex items-center justify-center bg-gray-50/30'>
                    <p className='text-gray-400 font-bold'>Suhbatni tanlang</p>
                </div>
            )}
        </div>
    );
}

