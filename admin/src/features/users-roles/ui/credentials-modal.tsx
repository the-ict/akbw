'use client';

import React from 'react';
import { Copy, Check, ShieldCheck } from 'lucide-react';
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/shared/ui/modal';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';

interface CredentialsModalProps {
    isOpen: boolean;
    onClose: () => void;
    credentials: {
        name: string;
        phone: string;
        token: string;
    } | null;
}

export default function CredentialsModal({ isOpen, onClose, credentials }: CredentialsModalProps) {
    const [copied, setCopied] = React.useState(false);

    if (!credentials) return null;

    const handleCopy = () => {
        const text = `Ism: ${credentials.name}\nTelefon: ${credentials.phone}\nToken: ${credentials.token}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('Barcha ma\'lumotlar nusxalandi!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-md bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
                <div className='p-8 flex flex-col items-center text-center'>
                    <div className='w-16 h-16 rounded-3xl bg-green-50 flex items-center justify-center mb-6 text-green-600 shadow-lg shadow-green-500/20'>
                        <ShieldCheck size={32} />
                    </div>

                    <ModalTitle className='text-xl font-black uppercase tracking-tight mb-2'>Muvaffaqiyatli!</ModalTitle>
                    <ModalDescription className='text-xs text-gray-400 font-bold uppercase tracking-widest px-4 leading-relaxed'>
                        Yangi admin muvaffaqiyatli yaratildi. Quyidagi token orqali tizimga kirish mumkin.
                    </ModalDescription>

                    <div className='w-full bg-gray-50 rounded-2xl p-6 mt-8 border border-gray-100 space-y-4'>
                        <div className='flex justify-between items-center'>
                            <span className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>Admin</span>
                            <span className='text-sm font-bold'>{credentials.name}</span>
                        </div>
                        <div className='h-px bg-gray-200 w-full' />
                        <div className='flex justify-between items-center'>
                            <span className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>Telefon</span>
                            <span className='text-sm font-bold font-mono'>{credentials.phone}</span>
                        </div>
                        <div className='h-px bg-gray-200 w-full' />
                        <div className='flex flex-col items-start gap-2'>
                            <span className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>JWT Token (Xavfsiz saqlang)</span>
                            <div className='w-full bg-white p-4 rounded-xl border border-gray-100 break-all text-[10px] font-mono font-bold text-blue-600 text-left select-all'>
                                {credentials.token}
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleCopy}
                        className='w-full mt-8 rounded-2xl h-14 bg-black text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer'
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Nusxalandi' : 'Nusxalash'}
                    </Button>
                </div>
            </ModalContent>
        </Modal>
    );
}
