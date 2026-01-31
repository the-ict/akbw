"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight, Tag, Check } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';
import { monsterrat } from '@/shared/fonts';
import ProductImage from "../../../../public/assets/product.png";
import { toast } from '@/shared/ui/toast';

export default function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Gradient Graphic T-shirt",
            size: "Large",
            color: "White",
            price: 145,
            quantity: 1,
            image: ProductImage.src
        },
        {
            id: 2,
            name: "Checkered Shirt",
            size: "Medium",
            color: "Red",
            price: 180,
            quantity: 1,
            image: ProductImage.src
        },
        {
            id: 3,
            name: "Skinny Fit Jeans",
            size: "Large",
            color: "Blue",
            price: 240,
            quantity: 1,
            image: ProductImage.src
        }
    ]);

    const [checkingOrders, setCheckingOrders] = useState<any[]>([]);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(items => items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id: number) => {
        const itemToRemove = cartItems.find(i => i.id === id);
        setCartItems(items => items.filter(item => item.id !== id));
        if (itemToRemove) {
            toast.success(`${itemToRemove.name} savatdan olib tashlandi`, {
                description: "Sizning savatingiz yangilandi."
            });
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        const newOrder = {
            id: Date.now(),
            items: [...cartItems],
            status: 'checking', // 'checking' | 'approved'
            date: new Date().toLocaleDateString(),
            total: subtotal - discount + deliveryFee
        };

        setCheckingOrders(prev => [newOrder, ...prev]);
        setCartItems([]);

        toast.success("Buyurtmangiz tekshiruvga yuborildi!", {
            description: "Tez orada operatorlarimiz siz bilan bog'lanishadi."
        });

        // Simulate approval for demo
        setTimeout(() => {
            setCheckingOrders(prev => prev.map(order =>
                order.id === newOrder.id ? { ...order, status: 'approved' } : order
            ));
            toast.info("Buyurtmangiz tasdiqlandi!", {
                description: "Endi buyurtma berishingiz mumkin."
            });
        }, 5000);
    };

    return (
        <div className='min-h-screen bg-white'>
            <div className='container py-10 px-4 md:px-6'>
                {/* Breadcrumbs */}
                <div className='flex gap-2 text-sm text-gray-500 mb-10'>
                    <span>Home</span>
                    <span>/</span>
                    <span className='text-black font-medium'>Cart</span>
                </div>

                <h1 className={cn('text-4xl md:text-5xl font-black uppercase mb-10', monsterrat.className)}>
                    Your Cart
                </h1>

                <div className='flex flex-col lg:flex-row gap-8 items-start mb-20'>
                    {/* Cart Items List */}
                    <div className='flex-1 w-full border border-gray-100 rounded-[20px] p-4 md:p-6 space-y-6'>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, idx) => (
                                <React.Fragment key={item.id}>
                                    <div className='flex gap-4 md:gap-6 items-center'>
                                        <div className='relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0'>
                                            <Image src={item.image} alt={item.name} fill className='object-cover' />
                                        </div>

                                        <div className='flex-1 flex flex-col justify-between h-24 md:h-32'>
                                            <div className='flex justify-between items-start'>
                                                <div>
                                                    <h3 className='font-bold text-lg md:text-xl'>{item.name}</h3>
                                                    <p className='text-sm text-gray-500'>Size: <span className='text-gray-400'>{item.size}</span></p>
                                                    <p className='text-sm text-gray-500'>Color: <span className='text-gray-400'>{item.color}</span></p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className='text-red-500 hover:text-red-600 transition-colors p-1 cursor-pointer'
                                                >
                                                    <Trash2 size={24} />
                                                </button>
                                            </div>

                                            <div className='flex justify-between items-end'>
                                                <span className='text-xl md:text-2xl font-bold'>${item.price}</span>
                                                <div className='flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2'>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className='hover:text-black transition-colors opacity-60 hover:opacity-100 cursor-pointer'
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className='font-bold'>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className='hover:text-black transition-colors opacity-60 hover:opacity-100 cursor-pointer'
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {idx !== cartItems.length - 1 && <hr className='border-gray-50' />}
                                </React.Fragment>
                            ))
                        ) : (
                            <div className='py-20 text-center'>
                                <p className='text-gray-400 text-lg'>Sizning savatingiz bo'sh.</p>
                                <Button className='mt-6 rounded-full px-10 py-6 font-bold cursor-pointer'>
                                    Mahsulotlarni ko'rish
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className='w-full lg:w-[400px] border border-gray-100 rounded-[20px] p-6 space-y-6'>
                        <h2 className='text-2xl font-bold'>Order Summary</h2>

                        <div className='space-y-4'>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500 text-lg'>Subtotal</span>
                                <span className='font-bold text-lg'>${subtotal}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500 text-lg'>Discount (-20%)</span>
                                <span className='font-bold text-lg text-red-500'>-${discount}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500 text-lg'>Delivery Fee</span>
                                <span className='font-bold text-lg'>${deliveryFee}</span>
                            </div>

                            <hr className='border-gray-50' />

                            <div className='flex justify-between items-center py-2'>
                                <span className='text-lg font-medium'>Total</span>
                                <span className='text-2xl font-bold'>${total}</span>
                            </div>
                        </div>

                        <div className='flex gap-3'>
                            <div className='relative flex-1'>
                                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
                                    <Tag size={20} />
                                </span>
                                <Input
                                    placeholder='Add promo code'
                                    className='pl-12 rounded-full h-12 bg-gray-50 border-none shadow-none text-sm'
                                />
                            </div>
                            <Button className='rounded-full px-8 py-6 h-12 font-bold cursor-pointer'>
                                Apply
                            </Button>
                        </div>

                        <Button
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                            className='w-full rounded-full py-8 font-black text-lg bg-black hover:bg-black/90 shadow-2xl hover:shadow-black/20 transition-all uppercase tracking-widest flex items-center justify-center gap-3 cursor-pointer'
                        >
                            tekshiruvga yuborish
                            <ArrowRight size={22} />
                        </Button>
                    </div>
                </div>

                {/* Checking Orders Section */}
                {checkingOrders.length > 0 && (
                    <div className='mt-20'>
                        <h2 className={cn('text-3xl font-black uppercase mb-10 text-gray-400', monsterrat.className)}>
                            Orders in Review
                        </h2>
                        <div className='space-y-6'>
                            {checkingOrders.map((order) => (
                                <div key={order.id} className='border border-gray-100 rounded-[24px] p-6 bg-gray-50/30 overflow-hidden relative'>
                                    {order.status === 'checking' && (
                                        <div className='absolute inset-0 bg-white/40 z-10' />
                                    )}
                                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-20'>
                                        <div className='flex gap-4 items-center'>
                                            <div className='flex -space-x-8'>
                                                {order.items.slice(0, 3).map((item: any, i: number) => (
                                                    <div key={i} className='w-20 h-20 rounded-xl overflow-hidden border-4 border-white shadow-sm'>
                                                        <Image src={item.image} alt={item.name} width={80} height={80} className='object-cover' />
                                                    </div>
                                                ))}
                                                {order.items.length > 3 && (
                                                    <div className='w-20 h-20 rounded-xl bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center font-bold text-gray-400'>
                                                        +{order.items.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <div className='ml-4'>
                                                <p className='text-sm text-gray-400 font-medium'>Order ID: <span className='text-black'>#{order.id.toString().slice(-6)}</span></p>
                                                <p className='font-bold text-lg'>${order.total}</p>
                                                <p className='text-xs text-gray-400'>{order.date}</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-6 w-full md:w-auto'>
                                            <div className={cn(
                                                'px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2',
                                                order.status === 'checking' ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-600'
                                            )}>
                                                {order.status === 'checking' ? (
                                                    <>
                                                        <div className='w-2 h-2 rounded-full bg-gray-400 animate-pulse' />
                                                        Checking...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check size={16} strokeWidth={3} />
                                                        Approved
                                                    </>
                                                )}
                                            </div>

                                            {order.status === 'approved' && (
                                                <Button className='rounded-full px-10 py-6 font-black uppercase text-sm bg-black hover:bg-black/90 shadow-xl transition-all cursor-pointer'>
                                                    Order Now
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
