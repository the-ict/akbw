'use client';

import React from 'react';
import { ShoppingBag, Calendar, X, Package } from 'lucide-react';
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/shared/ui/modal';
import { Button } from '@/shared/ui/button';

interface Order {
    id: string;
    date: string;
    total: string;
    status: string;
}

interface UserHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        orders: number;
    } | null;
}

// Mock History Data
const mockOrders: Order[] = [
    { id: 'ORD-7721', date: 'Jan 12, 2024', total: '$145.00', status: 'Delivered' },
    { id: 'ORD-6542', date: 'Dec 28, 2023', total: '$89.00', status: 'Delivered' },
    { id: 'ORD-5431', date: 'Nov 15, 2023', total: '$210.00', status: 'Delivered' },
];

export default function UserHistoryModal({ isOpen, onClose, user }: UserHistoryModalProps) {
    if (!user) return null;

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-2xl bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
                <div className='flex flex-col max-h-[80vh]'>
                    {/* Header */}
                    <div className='p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30'>
                        <div>
                            <ModalTitle className='text-xl font-black uppercase tracking-tight'>Buyurtmalar Tarixi</ModalTitle>
                            <ModalDescription className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                                {user.name} — {user.orders} ta jami buyurtma
                            </ModalDescription>
                        </div>
                        <button onClick={onClose} className='p-2 hover:bg-white rounded-full transition-all cursor-pointer'>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className='p-8 overflow-y-auto no-scrollbar space-y-4'>
                        {mockOrders.map((order) => (
                            <div key={order.id} className='bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-black/10 transition-colors group'>
                                <div className='flex items-center gap-4'>
                                    <div className='w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all'>
                                        <Package size={20} />
                                    </div>
                                    <div>
                                        <h4 className='text-sm font-black uppercase tracking-tight'>{order.id}</h4>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <div className='flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest'>
                                                <Calendar size={12} />
                                                {order.date}
                                            </div>
                                            <span className='w-1 h-1 rounded-full bg-gray-200' />
                                            <span className='text-[10px] text-green-500 font-black uppercase tracking-widest'>{order.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-[10px] text-gray-400 font-black uppercase tracking-widest'>Jami</p>
                                    <p className='text-sm font-black'>{order.total}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className='p-8 border-t border-gray-50 flex justify-end bg-gray-50/30'>
                        <Button
                            variant='ghost'
                            onClick={onClose}
                            className='rounded-[20px] h-14 px-8 font-black uppercase tracking-widest text-[10px] cursor-pointer'
                        >
                            Yopish
                        </Button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
