'use client';

import React, { useState } from 'react';
import {
    Search,
    MoreVertical,
    Send,
    User,
    ChevronRight,
    HelpCircle,
    Image as ImageIcon,
    ExternalLink,
    Box,
    X,
    Maximize2
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

const mockInquiries = [
    {
        id: 1,
        user: { name: 'Javohir Mamadaliyev', phone: '+998 97 111 22 33' },
        product: { name: 'Premium Cotton T-Shirt', image: '/assets/product.png', price: '120,000' },
        lastMessage: 'Sizda shunaqasi bormi?',
        time: '12:45',
        hasImage: true,
        status: 'pending'
    },
    {
        id: 2,
        user: { name: 'Diyora Rustamova', phone: '+998 33 000 99 88' },
        product: { name: 'Luxury Summer Dress', image: '/assets/product.png', price: '350,000' },
        lastMessage: 'Razi bormi?',
        time: 'Kecha',
        hasImage: false,
        status: 'answered'
    }
];

const mockMessages = [
    {
        id: 1,
        sender: 'user',
        text: 'Assalomu alaykum! Shu rasmda ko‘ringan mahsulotdan bormi sizlarda?',
        image: '/assets/product.png',
        time: '12:40'
    },
    {
        id: 2,
        sender: 'admin',
        text: 'Vaalaykum assalom! Hozir tekshirib beramiz.',
        time: '12:42'
    },
];

export default function ProductSupportChat() {
    const [selectedInquiry, setSelectedInquiry] = useState(mockInquiries[0]);
    const [message, setMessage] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    return (
        <div className='flex h-[calc(100vh-140px)] bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm relative'>

            {/* Image Preview Modal Overlay */}
            {previewImage && (
                <div className='absolute inset-0 bg-black/90 z-[100] flex items-center justify-center p-10 animate-in fade-in zoom-in duration-200'>
                    <button
                        onClick={() => setPreviewImage(null)}
                        className='absolute top-8 right-8 text-white hover:rotate-90 transition-all p-2'
                    >
                        <X size={32} />
                    </button>
                    <img src={previewImage} className='max-w-full max-h-full object-contain rounded-2xl shadow-2xl' />
                </div>
            )}

            {/* Sidebar - Inquiries List */}
            <div className='w-[350px] border-r border-gray-100 flex flex-col'>
                <div className='p-6 border-b border-gray-50'>
                    <h2 className='text-xl font-black uppercase tracking-tight mb-4 text-indigo-600'>So‘rovlar</h2>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                        <Input
                            placeholder='Qidirish...'
                            className='pl-10 rounded-xl bg-gray-50 border-none'
                        />
                    </div>
                </div>

                <div className='flex-1 overflow-y-auto no-scrollbar'>
                    {mockInquiries.map((inquiry) => (
                        <button
                            key={inquiry.id}
                            onClick={() => setSelectedInquiry(inquiry)}
                            className={cn(
                                'w-full p-4 flex gap-4 transition-all hover:bg-gray-50 text-left border-b border-gray-50/50',
                                selectedInquiry.id === inquiry.id && 'bg-indigo-50/50 border-l-4 border-indigo-600'
                            )}
                        >
                            <div className='w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100'>
                                <img src={inquiry.product.image} className='w-full h-full object-cover' />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <div className='flex justify-between items-start mb-1'>
                                    <h4 className='font-bold text-sm truncate'>{inquiry.user.name}</h4>
                                    <span className='text-[10px] text-gray-400 font-bold uppercase'>{inquiry.time}</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    {inquiry.hasImage && <ImageIcon size={12} className='text-indigo-600' />}
                                    <p className='text-xs text-gray-500 truncate'>{inquiry.lastMessage}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className='flex-1 flex flex-col bg-slate-50/20'>
                {/* Chat Header */}
                <div className='p-6 bg-white border-b border-gray-100 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center'>
                            <HelpCircle size={24} className='text-indigo-600' />
                        </div>
                        <div>
                            <div className='flex items-center gap-2'>
                                <h3 className='font-bold text-base'>{selectedInquiry.user.name}</h3>
                                <span className='px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-[8px] font-black uppercase tracking-wider'>SO‘ROV</span>
                            </div>
                            <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{selectedInquiry.user.phone}</p>
                        </div>
                    </div>

                    {/* Floating Product Card in Header */}
                    <div className='hidden xl:flex items-center bg-gray-50 rounded-2xl p-2 pr-4 border border-gray-100 gap-3'>
                        <div className='w-10 h-10 rounded-lg overflow-hidden border border-gray-200'>
                            <img src={selectedInquiry.product.image} className='w-full h-full object-cover' />
                        </div>
                        <div className='min-w-0 max-w-[150px]'>
                            <p className='text-[10px] font-black uppercase truncate'>{selectedInquiry.product.name}</p>
                            <p className='text-[10px] font-bold text-indigo-600'>{selectedInquiry.product.price} so'm</p>
                        </div>
                        <button className='p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-indigo-600 shadow-sm'>
                            <ExternalLink size={14} />
                        </button>
                    </div>

                    <div className='flex items-center gap-2'>
                        <button className='p-2.5 hover:bg-gray-50 rounded-xl transition-all border border-gray-100'>
                            <MoreVertical size={20} className='text-gray-400' />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className='flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar'>
                    {mockMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                'flex flex-col max-w-[60%]',
                                msg.sender === 'admin' ? 'ml-auto items-end' : 'mr-auto items-start'
                            )}
                        >
                            {msg.image && (
                                <div className='relative group mb-3 cursor-pointer' onClick={() => setPreviewImage(msg.image || null)}>
                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded-3xl flex items-center justify-center'>
                                        <Maximize2 className='text-white' size={24} />
                                    </div>
                                    <img
                                        src={msg.image}
                                        className='rounded-3xl border-4 border-white shadow-xl max-w-[300px]'
                                    />
                                </div>
                            )}
                            <div
                                className={cn(
                                    'px-6 py-4 rounded-[32px] text-sm shadow-sm',
                                    msg.sender === 'admin'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                )}
                            >
                                {msg.text}
                            </div>
                            <span className='text-[10px] mt-2 text-gray-400 font-bold uppercase px-2'>{msg.time}</span>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className='p-6 bg-white border-t border-gray-100'>
                    <div className='flex gap-4 items-center bg-gray-50 pl-6 pr-2 py-2 rounded-2xl border border-gray-100 focus-within:border-indigo-600 transition-all'>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Javob yozing...'
                            className='flex-1 bg-transparent border-none outline-none text-sm font-medium h-10'
                        />
                        <Button
                            className='rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 h-10 shadow-lg shadow-indigo-600/20'
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
