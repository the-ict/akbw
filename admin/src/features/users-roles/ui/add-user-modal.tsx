'use client';

import React from 'react';
import { X, User, Lock, KeyRound } from 'lucide-react';
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/shared/ui/modal';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (user: any) => void;
}

export default function AddUserModal({ isOpen, onClose, onAdd }: AddUserModalProps) {
    const [name, setName] = React.useState('');
    const [gender, setGender] = React.useState('male');
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');

    const generateCredentials = () => {
        const randomStr = Math.random().toString(36).substring(7);
        setLogin(`admin_${randomStr.substring(0, 4)}`);
        setPassword(Math.random().toString(36).slice(-8));
        setToken(`akbw_${Math.random().toString(36).substring(2, 10)}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            name,
            gender,
            login,
            pass: password,
            token: token,
            role: 'Moderator', // Default role
            permissions: ['Mahsulotlar', 'Buyurtmalar'],
            lastActive: 'Hozir qo‘shildi'
        });
        // Reset form
        setName('');
        setGender('male');
        setLogin('');
        setPassword('');
        setToken('');
    };

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-lg bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className='p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30'>
                        <div>
                            <ModalTitle className='text-xl font-black uppercase tracking-tight'>Yangi Foydalanuvchi</ModalTitle>
                            <ModalDescription className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                                Tizimga kirish uchun yangi profil yarating
                            </ModalDescription>
                        </div>
                        <button type='button' onClick={onClose} className='p-2 hover:bg-white rounded-full transition-all cursor-pointer'>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='p-8 space-y-6'>
                        <div className='space-y-4'>
                            <div>
                                <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block'>F.I.SH</label>
                                <div className='relative'>
                                    <User className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                    <Input
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='To‘liq ism kiriting'
                                        className='pl-12 h-14 bg-gray-50 border-none rounded-2xl font-bold'
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block'>Jinsi</label>
                                <div className='grid grid-cols-2 gap-4'>
                                    <button
                                        type='button'
                                        onClick={() => setGender('male')}
                                        className={`h-14 rounded-2xl border-2 font-black uppercase tracking-widest text-xs transition-all ${gender === 'male' ? 'border-black bg-black text-white' : 'border-gray-100 text-gray-400 hover:border-gray-300'
                                            }`}
                                    >
                                        Erkak
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setGender('female')}
                                        className={`h-14 rounded-2xl border-2 font-black uppercase tracking-widest text-xs transition-all ${gender === 'female' ? 'border-black bg-black text-white' : 'border-gray-100 text-gray-400 hover:border-gray-300'
                                            }`}
                                    >
                                        Ayol
                                    </button>
                                </div>
                            </div>

                            <div className='pt-4 border-t border-gray-50'>
                                <div className='flex justify-between items-center mb-4'>
                                    <label className='text-[10px] font-black uppercase tracking-widest text-gray-400'>Kirish Ma'lumotlari</label>
                                    <button
                                        type='button'
                                        onClick={generateCredentials}
                                        className='text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline'
                                    >
                                        Generatsiya qilish
                                    </button>
                                </div>

                                <div className='space-y-4'>
                                    <div className='relative'>
                                        <KeyRound className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                        <Input
                                            required
                                            value={login}
                                            onChange={(e) => setLogin(e.target.value)}
                                            placeholder='Login'
                                            className='pl-12 h-14 bg-gray-50 border-none rounded-2xl font-bold font-mono'
                                        />
                                    </div>
                                    <div className='relative'>
                                        <Lock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                        <Input
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Parol'
                                            className='pl-12 h-14 bg-gray-50 border-none rounded-2xl font-bold font-mono'
                                        />
                                    </div>
                                    <div className='relative'>
                                        <KeyRound className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                        <Input
                                            required
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                            placeholder='Admin Token'
                                            className='pl-12 h-14 bg-gray-50 border-none rounded-2xl font-bold font-mono text-blue-600'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='p-8 border-t border-gray-50 bg-gray-50/30'>
                        <Button
                            type='submit'
                            className='w-full rounded-2xl h-14 bg-black text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer'
                        >
                            Saqlash
                        </Button>
                    </div>
                </form>
            </ModalContent>
        </Modal>
    );
}
