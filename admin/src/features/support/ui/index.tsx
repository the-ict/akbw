'use client';

import React, { useState } from 'react';
import {
    Search,
    MoreVertical,
    Send,
    User,
    Clock,
    CheckCircle2,
    AlertCircle,
    Inbox,
    Filter
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

const mockChats = [
    {
        id: 1,
        user: { name: 'Alijon Ibragimov', phone: '+998 90 123 45 67', status: 'online' },
        lastMessage: 'Buyurtmam qachon keladi?',
        time: '10:30',
        unread: 2,
        status: 'active'
    },
    {
        id: 2,
        user: { name: 'Moxira Ahmedova', phone: '+998 99 876 54 32', status: 'offline' },
        lastMessage: 'Rahmat, hamma narsa yoqdi!',
        time: 'Kecha',
        unread: 0,
        status: 'closed'
    },
    {
        id: 3,
        user: { name: 'Sardorbek Toirov', phone: '+998 94 444 22 11', status: 'online' },
        lastMessage: 'To‘lovda xatolik bo‘ldi...',
        time: '09:15',
        unread: 0,
        status: 'urgent'
    }
];

const mockMessages = [
    { id: 1, sender: 'user', text: 'Assalomu alaykum! Savolim bor edi.', time: '09:00' },
    { id: 2, sender: 'admin', text: 'Vaalaykum assalom! Buyuring, qanday yordam bera olamiz?', time: '09:05' },
    { id: 3, sender: 'user', text: 'Buyurtmam qachon keladi? ID: #12345', time: '09:10' },
];

export default function SupportChat() {
    const [selectedChat, setSelectedChat] = useState(mockChats[0]);
    const [message, setMessage] = useState('');

    return (
        <div className='flex h-[calc(100vh-140px)] bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm'>
            {/* Sidebar - Chat List */}
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
                    {mockChats.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={cn(
                                'w-full p-4 flex gap-4 transition-all hover:bg-gray-50 text-left border-b border-gray-50/50',
                                selectedChat.id === chat.id && 'bg-gray-50 border-l-4 border-black'
                            )}
                        >
                            <div className='relative shrink-0'>
                                <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
                                    <User size={24} className='text-gray-400' />
                                </div>
                                {chat.user.status === 'online' && (
                                    <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full' />
                                )}
                            </div>
                            <div className='flex-1 min-w-0'>
                                <div className='flex justify-between items-start mb-1'>
                                    <h4 className='font-bold text-sm truncate'>{chat.user.name}</h4>
                                    <span className='text-[10px] text-gray-400 font-bold uppercase'>{chat.time}</span>
                                </div>
                                <p className='text-xs text-gray-500 truncate'>{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className='w-5 h-5 bg-black text-white text-[10px] font-black rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-black/20'>
                                    {chat.unread}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className='flex-1 flex flex-col bg-gray-50/30'>
                {/* Chat Header */}
                <div className='p-6 bg-white border-b border-gray-100 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='w-10 h-10 rounded-full bg-black/5 flex items-center justify-center'>
                            <User size={20} className='text-black' />
                        </div>
                        <div>
                            <h3 className='font-bold text-base'>{selectedChat.user.name}</h3>
                            <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{selectedChat.user.phone}</p>
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

                {/* Messages */}
                <div className='flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar'>
                    <div className='flex justify-center'>
                        <span className='px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest'>BUGUN</span>
                    </div>

                    {mockMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                'flex flex-col max-w-[70%]',
                                msg.sender === 'admin' ? 'ml-auto items-end' : 'mr-auto items-start'
                            )}
                        >
                            <div
                                className={cn(
                                    'px-5 py-3 rounded-[20px] text-sm shadow-sm',
                                    msg.sender === 'admin'
                                        ? 'bg-black text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                )}
                            >
                                {msg.text}
                            </div>
                            <span className='text-[10px] mt-2 text-gray-400 font-bold uppercase tracking-tighter'>{msg.time}</span>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className='p-6 bg-white border-t border-gray-100'>
                    <div className='flex gap-4 items-center bg-gray-50 pl-6 pr-2 py-2 rounded-2xl border border-gray-100 focus-within:border-black transition-all'>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Xabar yozing...'
                            className='flex-1 bg-transparent border-none outline-none text-sm font-medium h-10'
                        />
                        <Button
                            className='rounded-xl bg-black hover:bg-black/90 px-6 h-10'
                            disabled={!message.trim()}
                        >
                            <Send size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
