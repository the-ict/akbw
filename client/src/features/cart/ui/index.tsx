"use client";

import React, {
    useState
} from 'react';
import Image from 'next/image';
import {
    Minus,
    Plus,
    Trash2,
    ArrowRight,
    Tag,
    Check,
    MapPin,
    CreditCard,
    X,
    ChevronDown,
    Truck
} from 'lucide-react';
import {
    Button
} from '@/shared/ui/button';
import {
    Input
} from '@/shared/ui/input';
import {
    cn
} from '@/shared/lib/utils';
import {
    monsterrat,
    Radiant
} from '@/shared/fonts';
import ProductImage from "../../../../public/assets/product.png";
import { toast } from '@/shared/ui/toast';
import {
    Modal,
    ModalContent,
    ModalTitle,
    ModalDescription,
    ModalClose,
} from "@/shared/ui/modal";
import { OrderProgress } from './order-progress';

const UZBEKISTAN_DATA: Record<string, string[]> = {
    "Toshkent shahri": ["Olmazor", "Bektemir", "Mirobod", "Mirzo Ulug'bek", "Sergeli", "Uchtepa", "Chilonzor", "Shayxontohur", "Yunusobod", "Yakkasaroy", "Yashnobod"],
    "Toshkent viloyati": ["Angren", "Olmaliq", "Chirchiq", "Bekobod", "Bo'stonliq", "Zangiota", "Qibray", "Parkent", "Piskent", "O'rtachirchiq", "Yangiyo'l"],
    "Samarqand viloyati": ["Samarqand sh.", "Oqdaryo", "Bulung'ur", "Jomboy", "Ishtixon", "Kattaqo'rg'on", "Narpay", "Payariq", "Pastdarg'om", "Toyloq"],
    "Buxoro viloyati": ["Buxoro sh.", "G'ijduvon", "Jondor", "Kogon", "Olot", "Peshku", "Romitan", "Shorofirkon", "Qorovulbozor", "Qorakol"],
    "Fargʻona viloyati": ["Farg'ona sh.", "Marg'ilon sh.", "Qo'qon sh.", "Quva", "Oltiariq", "Bog'dod", "Buvayda", "Dang'ara", "Uchko'prik", "Yozyovon"],
    "Andijon viloyati": ["Andijon sh.", "Asaka", "Baliqchi", "Bo'ston", "Buloqboshi", "Jalaquduq", "Izboskan", "Qo'rg'ontepa", "Marhamat", "Paxtaobod"],
    "Namangan viloyati": ["Namangan sh.", "Chartaq", "Chust", "Kosonsoy", "Mingbuloq", "Norin", "Pop", "To'raqo'rg'on", "Uychi", "Uchqo'rg'on", "Yangiqo'rg'on"],
    "Jizzax viloyati": ["Jizzax sh.", "Arnasoy", "Baxmal", "Do'stlik", "Forish", "G'allaorol", "Mirzachol", "Paxtakor", "Zamin", "Zafarobod"],
    "Sirdaryo viloyati": ["Guliston sh.", "Boyovut", "Oqoltin", "Sardoba", "Sayxunobod", "Sirdaryo", "Xovos", "Shirin sh.", "Yangiyer sh."],
    "Qashqadaryo viloyati": ["Qarshi sh.", "G'uzor", "Dehqonobod", "Kasbi", "Kitob", "Koson", "Muborak", "Nishon", "Shahrisabz", "Yakkabog'"],
    "Surxondaryo viloyati": ["Termiz sh.", "Angor", "Boysun", "Denov", "Jarqo'rg'on", "Qiziriq", "Qumqo'rg'on", "Muzrabot", "Sariosiyo", "Sherobod", "Sho'rchi"],
    "Navoiy viloyati": ["Navoiy sh.", "Zarafshon sh.", "Karmana", "Konimex", "Navbahor", "Nurota", "Tomdi", "Uchkuduk sh.", "Xatirchi", "Qiziltepa"],
    "Xorazm viloyati": ["Urganch sh.", "Xiva sh.", "Bog'ot", "Gurlan", "Qo'shko'pir", "Showot", "Tuproqqal'a", "Xazorasp", "Xonqa", "Yangiariq", "Yangibozor"],
    "Qoraqalpogʻiston Respublikasi": ["Nukus sh.", "Amudaryo", "Beruniy", "Kanlikul", "Mo'ynoq", "Nukus", "Taxiatosh sh.", "To'rtkol", "Xojayli", "Chimboy", "Ellikqal'a"]
};


import Uzum from "../../../../public/icons/uzum.png"
import Click from "../../../../public/icons/click.png"
import Payme from "../../../../public/icons/payme.png"
import Paynet from "../../../../public/icons/paynet.svg"

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
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [region, setRegion] = useState('');
    const [district, setDistrict] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    const [checkoutPromoCode, setCheckoutPromoCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'payme' | 'click'>('payme');

    const [modalMode, setModalMode] = useState<'checkout' | 'tracking'>('checkout');

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
            status: 'checking',
            date: new Date().toLocaleDateString(),
            total: subtotal - discount + deliveryFee,
            subtotal,
            discount,
            deliveryFee
        };

        setCheckingOrders(prev => [newOrder, ...prev]);
        setCartItems([]);

        toast.success("Buyurtmangiz tekshiruvga yuborildi!", {
            description: "Tez orada operatorlarimiz siz bilan bog'lanishadi."
        });

        setTimeout(() => {
            setCheckingOrders(prev => prev.map(order =>
                order.id === newOrder.id ? { ...order, status: 'approved' } : order
            ));
            toast.info("Buyurtmangiz tasdiqlandi!", {
                description: "Endi buyurtma berishingiz mumkin."
            });
        }, 5000);
    };

    const handleOrderNow = (order: any) => {
        setSelectedOrder(order);
        setModalMode('checkout');
        setIsCheckoutOpen(true);
    };

    const finalizePayment = () => {
        if (!region || !district || !detailedAddress) {
            toast.error("Iltimos, barcha manzillarni to'ldiring");
            return;
        }

        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: "To'lov amalga oshirilmoqda...",
                success: "To'lov muvaffaqiyatli yakunlandi! Rahmat.",
                error: "To'lovda xatolik yuz berdi.",
            }
        );
        setTimeout(() => {
            // Switch to tracking mode instead of closing
            setModalMode('tracking');
            // Update order status to delivering instead of removing
            setCheckingOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: 'delivering' } : o));
            // Don't clear address yet, user might want to see it
        }, 2500);
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
                            Active Orders
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
                                            {/* Status Badge */}
                                            <div className={cn(
                                                'px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2',
                                                order.status === 'checking' ? 'bg-gray-200 text-gray-500' :
                                                    order.status === 'delivering' ? 'bg-blue-100 text-blue-600' :
                                                        'bg-green-100 text-green-600'
                                            )}>
                                                {order.status === 'checking' && (
                                                    <>
                                                        <div className='w-2 h-2 rounded-full bg-gray-400 animate-pulse' />
                                                        Checking...
                                                    </>
                                                )}
                                                {order.status === 'approved' && (
                                                    <>
                                                        <Check size={16} strokeWidth={3} />
                                                        Approved
                                                    </>
                                                )}
                                                {order.status === 'delivering' && (
                                                    <>
                                                        <Truck size={16} strokeWidth={2.5} />
                                                        On the way
                                                    </>
                                                )}
                                            </div>

                                            {/* Action Button */}
                                            {order.status === 'approved' && (
                                                <Button
                                                    onClick={() => handleOrderNow(order)}
                                                    className='rounded-full px-10 py-6 font-black uppercase text-sm bg-black hover:bg-black/90 shadow-xl transition-all cursor-pointer'
                                                >
                                                    Order Now
                                                </Button>
                                            )}
                                            {order.status === 'delivering' && (
                                                <Button
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setModalMode('tracking');
                                                        setIsCheckoutOpen(true);
                                                    }}
                                                    className='rounded-full px-10 py-6 font-bold uppercase text-sm bg-white text-black border-2 border-black hover:bg-gray-50 transition-all cursor-pointer'
                                                >
                                                    Track Order
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

            {/* Checkout / Tracking Modal */}
            <Modal open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <ModalContent className="max-w-2xl bg-white p-0 overflow-hidden border-none rounded-[32px] shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
                    {modalMode === 'checkout' ? (
                        <div className="p-8 space-y-8">
                            <div className="space-y-2">
                                <ModalTitle className={cn("text-3xl font-black uppercase tracking-tight", Radiant.className)}>
                                    Finalize Your Order
                                </ModalTitle>
                                <ModalDescription className="text-gray-400 font-medium">
                                    Provide your delivery address and choose a payment method.
                                </ModalDescription>
                            </div>

                            {/* Products Preview */}
                            <div className="flex -space-x-10 overflow-x-auto py-2 no-scrollbar">
                                {selectedOrder?.items.map((item: any, i: number) => (
                                    <div key={i} className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl hover:-translate-y-2 transition-transform flex-shrink-0">
                                        <Image src={item.image} alt={item.name} width={96} height={96} className="object-cover" />
                                    </div>
                                ))}
                            </div>

                            {/* Manual Location Selection */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2 text-black">
                                    <MapPin size={20} />
                                    Delivery Address
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Region</label>
                                        <div className="relative">
                                            <select
                                                value={region}
                                                onChange={(e) => { setRegion(e.target.value); setDistrict(''); }}
                                                className="w-full bg-gray-50 border-none rounded-2xl h-14 px-5 text-sm font-semibold appearance-none cursor-pointer focus:ring-2 focus:ring-black/5"
                                            >
                                                <option value="">Select Region</option>
                                                {Object.keys(UZBEKISTAN_DATA).map(r => (
                                                    <option key={r} value={r}>{r}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">District</label>
                                        <div className="relative">
                                            <select
                                                value={district}
                                                disabled={!region}
                                                onChange={(e) => setDistrict(e.target.value)}
                                                className="w-full bg-gray-50 border-none rounded-2xl h-14 px-5 text-sm font-semibold appearance-none cursor-pointer focus:ring-2 focus:ring-black/5 disabled:opacity-50"
                                            >
                                                <option value="">Select District</option>
                                                {region && UZBEKISTAN_DATA[region].map(d => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1">Detailed Address (Street, House, Apartment)</label>
                                    <Input
                                        value={detailedAddress}
                                        onChange={(e) => setDetailedAddress(e.target.value)}
                                        placeholder="e.g. Amir Temur Avenue, 108"
                                        className="h-14 rounded-2xl bg-gray-50 border-none px-5 text-sm font-semibold focus:ring-2 focus:ring-black/5"
                                    />
                                </div>
                            </div>

                            {/* Payment Selection */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <CreditCard size={20} className="text-black" />
                                    Payment Method
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: 'payme', name: 'Payme', icon: Payme.src },
                                        { id: 'click', name: 'Click', icon: Click.src },
                                        { id: "uzum", name: "Uzum", icon: Uzum.src },
                                        { id: "paynet", name: "Paynet", icon: Paynet.src }
                                    ].map((method) => (
                                        <div
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id as any)}
                                            className={cn(
                                                "flex flex-col items-center justify-center p-2 rounded-[12px] border-2 transition-all cursor-pointer gap-2",
                                                paymentMethod === method.id
                                                    ? "border-black bg-black/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                                                    : "border-gray-50 bg-gray-50/50 hover:border-black/10"
                                            )}
                                        >
                                            <Image src={method.icon} alt={method.name} width={120} height={120} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Coupon Code Selection */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Tag size={20} className="text-black" />
                                    Coupon Code
                                </h3>
                                <div className="flex gap-3">
                                    <Input
                                        value={checkoutPromoCode}
                                        onChange={(e) => setCheckoutPromoCode(e.target.value)}
                                        placeholder="Enter coupon code"
                                        className="h-12 rounded-full bg-gray-50 border-none px-5 text-sm font-semibold"
                                    />
                                    <Button className="rounded-full px-8 bg-gray-100 hover:bg-gray-200 text-black font-bold h-12 shadow-none border-none">
                                        Apply
                                    </Button>
                                </div>
                            </div>

                            {/* Total & Pay */}
                            <div className="bg-black rounded-[28px] p-6 flex justify-between items-center text-white shadow-xl shadow-black/10">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total to Pay</span>
                                    <span className={cn("text-3xl font-black", Radiant.className)}>
                                        ${selectedOrder?.total}
                                    </span>
                                </div>
                                <Button
                                    onClick={finalizePayment}
                                    className="rounded-full px-10 py-7 font-black text-lg bg-white text-black hover:bg-white/90 transition-all uppercase tracking-widest cursor-pointer border-none"
                                >
                                    Pay Now
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8">
                            <div className="text-center mb-10 space-y-2">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check size={32} strokeWidth={3} />
                                </div>
                                <ModalTitle className={cn("text-3xl font-black uppercase tracking-tight", Radiant.className)}>
                                    Buyurtma Qabul Qilindi!
                                </ModalTitle>
                                <ModalDescription className="text-gray-400 font-medium">
                                    To'lov muvaffaqiyatli amalga oshirildi. Buyurtmangiz yo'lga chiqdi.
                                </ModalDescription>
                            </div>

                            {/* Products Preview Minimal */}
                            <div className="flex justify-center -space-x-4 mb-10">
                                {selectedOrder?.items.map((item: any, i: number) => (
                                    <div key={i} className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                        <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover" />
                                    </div>
                                ))}
                            </div>

                            {/* Tracking Animation */}
                            <div className="bg-gray-50 rounded-[24px] p-6 shadow-sm border border-gray-100">
                                <OrderProgress status="delivering" progress={33} />
                            </div>

                            <div className="mt-8">
                                <Button
                                    onClick={() => setIsCheckoutOpen(false)}
                                    className="w-full rounded-full py-7 font-bold text-lg bg-black text-white hover:bg-black/80 transition-all cursor-pointer"
                                >
                                    Yopish
                                </Button>
                            </div>
                        </div>
                    )}
                    <ModalClose className="bg-white/80 backdrop-blur-md rounded-full p-2 hover:bg-white transition-all shadow-sm absolute top-4 right-4 focus:ring-0">
                        <X size={20} />
                    </ModalClose>
                </ModalContent>
            </Modal>
        </div>
    );
}
