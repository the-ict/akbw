'use client';

import React from 'react';
import { X, User, Phone, Shield, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/shared/ui/modal';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { toast } from 'sonner';
import Loading from '@/widgets/loading/ui';
import { useCreateAdmin } from '../lib/hooks';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (user: any, token: string) => void;
}

const CORE_PERMISSIONS = [
    { id: 'view', name: 'ko\'rish', label: 'Ko‘rish', icon: '👁️' },
    { id: 'create', name: 'yaratish', label: 'Yaratish', icon: '➕' },
    { id: 'edit', name: 'o\'zgartirish', label: 'O‘zgartirish', icon: '✏️' },
    { id: 'delete', name: 'o\'chirish', label: 'O‘chirish', icon: '🗑️' },
];

export default function AddUserModal({ isOpen, onClose, onAdd }: AddUserModalProps) {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [role, setRole] = React.useState('Moderator');
    const [access, setAccess] = React.useState<string[]>([]);

    const togglePermission = (perm: string) => {
        setAccess(prev =>
            prev.includes(perm)
                ? prev.filter(p => p !== perm)
                : [...prev, perm]
        );
    };

    const createAdminMutation = useCreateAdmin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await createAdminMutation.mutateAsync({
                name,
                lastName,
                phone,
                role: role || undefined,
                access
            });

            if (result.ok) {
                onAdd(result.admin, result.token);
                setName('');
                setLastName('');
                setPhone('');
                setRole('Moderator');
                setAccess([]);
                toast.success('Admin muvaffaqiyatli yaratildi!');
                onClose();
            }
        } catch (error: any) {
            // Error is handled by the mutation onError
        }
    };

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-2xl bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className='p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30'>
                        <div>
                            <ModalTitle className='text-2xl font-black uppercase tracking-tight'>Yangi Admin Qo'shish</ModalTitle>
                            <ModalDescription className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                                Tizimga kirish huquqiga ega yangi admin profilini yarating
                            </ModalDescription>
                        </div>
                        <button type='button' onClick={onClose} className='p-2 hover:bg-white rounded-full transition-all cursor-pointer'>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='space-y-6'>
                            <div className='space-y-4'>
                                <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 block'>Asosiy Ma'lumotlar</label>

                                <div className='relative'>
                                    <User className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                    <Input
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Ism'
                                        className='pl-12 h-14 bg-gray-50 border-none rounded-2xl font-bold transition-all focus:bg-white focus:ring-2 focus:ring-black/5'
                                    />
                                </div>

                                <div className='relative'>
                                    <User className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                    <Input
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder='Familiya'
                                        className='pl-12 h-14 bg-gray-50 border-none rounded-2xl font-bold transition-all focus:bg-white focus:ring-2 focus:ring-black/5'
                                    />
                                </div>

                                <div className='relative'>
                                    <Phone className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                    <Input
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder='Telefon raqam'
                                        className='pl-12 h-14 bg-gray-50 border-none rounded-2xl font-bold transition-all focus:bg-white focus:ring-2 focus:ring-black/5'
                                    />
                                </div>

                                <div>
                                    <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block'>Lavozim</label>
                                    <div className='grid grid-cols-2 gap-3'>
                                        {['Admin', 'Moderator'].map((r) => (
                                            <button
                                                key={r}
                                                type='button'
                                                onClick={() => setRole(r)}
                                                className={`h-12 rounded-xl border-2 font-bold text-xs transition-all flex items-center justify-center gap-2 ${role === r ? 'border-black bg-black text-white' : 'border-gray-100 text-gray-400 hover:border-gray-200'
                                                    }`}
                                            >
                                                {r === 'Admin' ? <ShieldCheck size={14} /> : <Shield size={14} />}
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-6'>
                            <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 block'>Ruxsatnomalar (Permissions)</label>

                            <div className='grid grid-cols-1 gap-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar'>
                                {CORE_PERMISSIONS.map((perm) => (
                                    <div
                                        key={perm.id}
                                        onClick={() => togglePermission(perm.name)}
                                        className={`group cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${access.includes(perm.name)
                                            ? 'border-black bg-gray-50'
                                            : 'border-transparent bg-gray-50 hover:border-gray-200'
                                            }`}
                                    >
                                        <div className='flex items-center gap-3'>
                                            <span className='text-xl'>{perm.icon}</span>
                                            <span className={`text-sm font-bold ${access.includes(perm.name) ? 'text-black' : 'text-gray-700'}`}>
                                                {perm.label}
                                            </span>
                                        </div>

                                        {/* Premium Switch UI */}
                                        <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 relative ${access.includes(perm.name) ? 'bg-black' : 'bg-gray-200'
                                            }`}>
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${access.includes(perm.name) ? 'translate-x-4' : 'translate-x-0'
                                                }`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='p-8 border-t border-gray-50 bg-gray-50/30'>
                        <Button
                            type='submit'
                            disabled={createAdminMutation.isPending}
                            className='w-full rounded-2xl h-14 bg-black text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-black/10 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden'
                        >
                            {createAdminMutation.isPending ? (
                                <Loading />
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <CheckCircle2 size={18} />
                                    Adminni Saqlash
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </ModalContent>
        </Modal>
    );
}
