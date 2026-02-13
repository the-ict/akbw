'use client';

import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import {
    Search,
    MoreVertical,
    Send,
    HelpCircle,
    Image as ImageIcon,
    Box,
    X,
    Maximize2,
    Download
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
    useAdminAskChats,
    useAdminSendMessage
} from '../../chat/lib/hooks';


export default function ProductSupportChat() {
    const { data: inquiries = [], isLoading } = useAdminAskChats();
    const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const previewImageRef = useRef<HTMLImageElement | null>(null);

    const selectedInquiry = inquiries.find((i: any) => i.id === selectedInquiryId) || inquiries[0];

    const sendMessageMutation = useAdminSendMessage('ask');

    const handleSend = async () => {
        if (!message.trim() || !selectedInquiry) return;
        try {
            await sendMessageMutation.mutateAsync({
                chat_id: selectedInquiry.id,
                message: message.trim()
            });
            setMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownload = () => {
        if (!previewImage) return;
        if (!previewImageRef.current) return;

        const link = document.createElement("a");
        link.href = previewImageRef.current.src;
        link.download;
    };

    useEffect(() => {
        if (inquiries.length > 0 && selectedInquiryId === null) {
            setSelectedInquiryId(inquiries[0].id);
        }
    }, [inquiries, selectedInquiryId]);

    if (isLoading) {
        return (
            <div className='flex h-[calc(100vh-140px)] items-center justify-center bg-white rounded-[32px]'>
                <p className='text-gray-400 font-bold animate-pulse'>Yuklanmoqda...</p>
            </div>
        );
    }

    if (inquiries.length === 0) {
        return (
            <div className='flex h-[calc(100vh-140px)] items-center justify-center bg-white rounded-[32px]'>
                <div className='text-center'>
                    <HelpCircle size={48} className='mx-auto text-gray-200 mb-4' />
                    <p className='text-gray-400 font-bold'>Hozircha so'rovlar yo'q</p>
                </div>
            </div>
        );
    }

    return (
        <div className='flex h-[calc(100vh-140px)] bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm relative'>

            {previewImage && (
                <div className='absolute inset-0 bg-black/90 z-[100] flex items-center justify-center p-10 animate-in fade-in zoom-in duration-200'>
                    <button
                        onClick={() => setPreviewImage(null)}
                        className='absolute top-8 right-8 text-white hover:rotate-90 transition-all p-2'
                    >
                        <X size={32} />
                    </button>
                    <img src={previewImage} ref={previewImageRef} id='preview-image' className='max-w-full max-h-full object-contain rounded-2xl shadow-2xl' />


                    <button
                        className='absolute bottom-8 right-8 text-white cursor-pointer'
                        onClick={handleDownload}>
                        <Download size={32} />
                    </button>
                </div>
            )}

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
                    {inquiries.map((inquiry: any) => (
                        <button
                            key={inquiry.id}
                            onClick={() => setSelectedInquiryId(inquiry.id)}
                            className={cn(
                                'w-full p-4 flex gap-4 transition-all hover:bg-gray-50 text-left border-b border-gray-50/50',
                                selectedInquiry?.id === inquiry.id && 'bg-indigo-50/50 border-l-4 border-indigo-600'
                            )}
                        >
                            <div className='w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center'>
                                {inquiry.messages?.some((m: any) => m.photo) ? (
                                    <img src={inquiry.messages.find((m: any) => m.photo).photo} className='w-full h-full object-cover' />
                                ) : (
                                    <Box size={24} className='text-gray-300' />
                                )}
                            </div>
                            <div className='flex-1 min-w-0'>
                                <div className='flex justify-between items-start mb-1'>
                                    <h4 className='font-bold text-sm truncate'>{inquiry.user?.name || 'Foydalanuvchi'}</h4>
                                    <span className='text-[10px] text-gray-400 font-bold uppercase'>
                                        {inquiry.messages?.length > 0
                                            ? new Date(inquiry.messages[inquiry.messages.length - 1].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            : ''}
                                    </span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    {inquiry.messages?.some((m: any) => m.photo) && <ImageIcon size={12} className='text-indigo-600' />}
                                    <p className='text-xs text-gray-500 truncate'>
                                        {inquiry.messages?.length > 0 ? inquiry.messages[inquiry.messages.length - 1].message : 'Xabar yo\'q'}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selectedInquiry ? (
                <div className='flex-1 flex flex-col bg-slate-50/20'>
                    <div className='p-6 bg-white border-b border-gray-100 flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <div className='w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center'>
                                <HelpCircle size={24} className='text-indigo-600' />
                            </div>
                            <div>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-bold text-base'>{selectedInquiry.user?.name || 'Foydalanuvchi'}</h3>
                                    <span className='px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-[8px] font-black uppercase tracking-wider'>SO‘ROV</span>
                                </div>
                                <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{selectedInquiry.user?.phone}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <button className='p-2.5 hover:bg-gray-50 rounded-xl transition-all border border-gray-100'>
                                <MoreVertical size={20} className='text-gray-400' />
                            </button>
                        </div>
                    </div>

                    <div className='flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar flex flex-col'>
                        {selectedInquiry.messages?.map((msg: any) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    'flex flex-col max-w-[60%]',
                                    msg.admin_id ? 'ml-auto items-end' : 'mr-auto items-start'
                                )}
                            >
                                {msg.photo && (
                                    <div className='relative group mb-3 cursor-pointer' onClick={() => setPreviewImage(msg.photo || null)}>
                                        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded-3xl flex items-center justify-center'>
                                            <Maximize2 className='text-white' size={24} />
                                        </div>
                                        <img
                                            src={msg.photo}
                                            className='rounded-3xl border-4 border-white shadow-xl max-w-[300px]'
                                        />
                                    </div>
                                )}
                                <div
                                    className={cn(
                                        'px-6 py-4 rounded-[32px] text-sm shadow-sm',
                                        msg.admin_id
                                            ? 'bg-indigo-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                    )}
                                >
                                    {msg.message}
                                </div>
                                <span className='text-[10px] mt-2 text-gray-400 font-bold uppercase px-2'>
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className='p-6 bg-white border-t border-gray-100'>
                        <div className='flex gap-4 items-center bg-gray-50 pl-6 pr-2 py-2 rounded-2xl border border-gray-100 focus-within:border-indigo-600 transition-all'>
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder='Javob yozing...'
                                className='flex-1 bg-transparent border-none outline-none text-sm font-medium h-10'
                            />
                            <Button
                                onClick={handleSend}
                                className='rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 h-10 shadow-lg shadow-indigo-600/20'
                                disabled={!message.trim() || sendMessageMutation.isPending}
                            >
                                <Send size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex-1 flex items-center justify-center bg-slate-50/20'>
                    <p className='text-gray-400 font-bold'>So'rovni tanlang</p>
                </div>
            )}
        </div>
    );
}

