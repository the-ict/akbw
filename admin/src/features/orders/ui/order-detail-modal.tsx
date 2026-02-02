'use client';

import React from 'react';
import {
    X,
    Printer,
    Truck,
    User,
    MapPin,
    CreditCard,
    ShoppingBag,
    Calendar,
    Package,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/shared/ui/modal';

interface OrderDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: any;
}

export default function OrderDetailModal({ isOpen, onClose, order }: OrderDetailModalProps) {
    if (!order) return null;

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent className='max-w-4xl bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl'>
                <div className='flex flex-col h-[90vh]'>
                    {/* Header */}
                    <div className='p-8 border-b border-gray-50 flex justify-between items-start bg-gray-50/30'>
                        <div>
                            <span className='inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-3'>
                                #BUYURTMA {order.id}
                            </span>
                            <ModalTitle className='text-2xl font-black uppercase tracking-tight'>Buyurtma tafsilotlari</ModalTitle>
                            <ModalDescription className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2'>
                                <Calendar size={12} />
                                {order.date}
                            </ModalDescription>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Button variant='outline' className='rounded-xl border-gray-200 h-11 px-4 text-xs font-black uppercase tracking-widest cursor-pointer'>
                                <Printer size={16} className='mr-2' />
                                Chop etish
                            </Button>
                            <button onClick={onClose} className='p-2 hover:bg-white rounded-full transition-all cursor-pointer'>
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='flex-1 p-8 overflow-y-auto no-scrollbar'>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            {/* Left: Product List */}
                            <div className='lg:col-span-2 space-y-6'>
                                <div className='bg-white rounded-3xl border border-gray-100 p-6'>
                                    <h3 className='text-[10px] uppercase tracking-widest font-black text-gray-400 mb-6 flex items-center gap-2'>
                                        <ShoppingBag size={14} />
                                        Sotib olingan mahsulotlar
                                    </h3>
                                    <div className='space-y-6'>
                                        {[1, 2].map((i) => (
                                            <div key={i} className='flex gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0'>
                                                <div className='w-20 h-20 rounded-2xl bg-gray-50 overflow-hidden shrink-0'>
                                                    <img src={`https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80`} alt="product" className='w-full h-full object-cover' />
                                                </div>
                                                <div className='flex-1 py-1'>
                                                    <div className='flex justify-between'>
                                                        <h4 className='text-sm font-black uppercase'>Oversized Graphics T-Shirt</h4>
                                                        <span className='text-sm font-black'>$90.00</span>
                                                    </div>
                                                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>XL / Qora</p>
                                                    <div className='flex justify-between items-end mt-2'>
                                                        <span className='text-xs font-bold text-gray-500'>Soni: 2</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-6'>
                                    <div className='bg-white rounded-3xl border border-gray-100 p-6'>
                                        <h3 className='text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4 flex items-center gap-2'>
                                            <CreditCard size={14} />
                                            To‘lov ma’lumotlari
                                        </h3>
                                        <p className='text-sm font-black uppercase mb-1'>{order.payment}</p>
                                        <p className='text-xs text-gray-500 font-medium'>To‘lov statusi: <span className='text-green-500 font-bold'>To‘landi</span></p>
                                    </div>
                                    <div className='bg-white rounded-3xl border border-gray-100 p-6'>
                                        <h3 className='text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4 flex items-center gap-2'>
                                            <Truck size={14} />
                                            Kuryer xizmati
                                        </h3>
                                        <p className='text-sm font-black uppercase mb-1'>Express Delivery</p>
                                        <p className='text-xs text-gray-500 font-medium'>ID: #TRK-99201</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Customer & Summary */}
                            <div className='space-y-6'>
                                <div className='bg-white rounded-3xl border border-gray-100 p-6'>
                                    <h3 className='text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4 flex items-center gap-2'>
                                        <User size={14} />
                                        Mijoz ma’lumotlari
                                    </h3>
                                    <p className='text-sm font-black uppercase'>{order.customer}</p>
                                    <p className='text-xs text-gray-500 font-medium mt-1'>{order.phone}</p>
                                    <p className='text-xs text-gray-500 font-medium'>davlatbek@example.com</p>
                                    <hr className='my-4 border-gray-50' />
                                    <div className='flex items-start gap-2'>
                                        <MapPin size={14} className='text-gray-400 mt-0.5 shrink-0' />
                                        <p className='text-xs text-gray-600 font-medium leading-relaxed'>{order.address}</p>
                                    </div>
                                </div>

                                <div className='bg-black text-white rounded-3xl p-6'>
                                    <h3 className='text-[10px] uppercase tracking-[0.2em] font-black text-white/40 mb-6'>Umumiy hisob</h3>
                                    <div className='space-y-4'>
                                        <div className='flex justify-between text-xs font-bold uppercase'>
                                            <span className='text-white/60'>Mahsulotlar (4t):</span>
                                            <span>$452.00</span>
                                        </div>
                                        <div className='flex justify-between text-xs font-bold uppercase'>
                                            <span className='text-white/60'>Yetkazish:</span>
                                            <span>$15.00</span>
                                        </div>
                                        <hr className='border-white/10' />
                                        <div className='flex justify-between text-lg font-black tracking-tight'>
                                            <span>JAMI:</span>
                                            <span>{order.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className='p-8 border-t border-gray-50 bg-gray-50/10 flex justify-end gap-3'>
                        <Button variant='outline' className='rounded-2xl h-14 px-8 border-red-100 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-50 transition-all cursor-pointer'>
                            Bekor qilish
                        </Button>
                        <Button className='rounded-[20px] h-14 px-12 bg-black text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer'>
                            <Package size={18} />
                            Statusni o‘zgartirish
                        </Button>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}
