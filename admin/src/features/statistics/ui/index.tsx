'use client';

import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingBag,
    Users,
    Target,
    Instagram,
    Send,
    MousePointer2,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { Button } from '@/shared/ui/button';

// Mock Data
const salesTrend = [
    { name: 'DUSH', sales: 4000 },
    { name: 'SESH', sales: 3000 },
    { name: 'CHOR', sales: 2000 },
    { name: 'PAY', sales: 2780 },
    { name: 'JUM', sales: 1890 },
    { name: 'SHAN', sales: 2390 },
    { name: 'YAK', sales: 3490 },
];

const trafficData = [
    { name: 'Instagram', value: 45, color: '#000000', icon: Instagram },
    { name: 'Telegram', value: 30, color: '#333333', icon: Send },
    { name: 'Direct', value: 25, color: '#666666', icon: MousePointer2 },
];

const variantData = [
    { name: 'XS', value: 45 },
    { name: 'S', value: 80 },
    { name: 'M', value: 120 },
    { name: 'L', value: 95 },
    { name: 'XL', value: 30 },
];

const colorData = [
    { name: 'Black', value: 150, hex: '#000000' },
    { name: 'White', value: 80, hex: '#FFFFFF' },
    { name: 'Gray', value: 45, hex: '#808080' },
];

export default function Statistics() {
    return (
        <div className='space-y-8 pb-10'>
            {/* Header */}
            <div>
                <h1 className='text-2xl font-black uppercase tracking-tight'>Statistika</h1>
                <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Ma’lumotlar asosida qaror qabul qiling</p>
            </div>

            {/* Top Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {[
                    { label: 'O‘rtacha Chek', value: '$124.00', change: '+12%', up: true, icon: Target },
                    { label: 'Kunlik Savdo', value: '$4,520', change: '+18%', up: true, icon: DollarSign },
                    { label: 'Oylik Buyurtma', value: '1,234', change: '-2%', up: false, icon: ShoppingBag },
                    { label: 'Yangi Mijoz', value: '456', change: '+5%', up: true, icon: Users },
                ].map((stat, i) => (
                    <div key={i} className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm'>
                        <div className='flex justify-between items-start mb-4'>
                            <div className='p-3 bg-gray-50 rounded-2xl'>
                                <stat.icon size={20} className='text-black' />
                            </div>
                            <div className={cn(
                                'flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-lg',
                                stat.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            )}>
                                {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1'>{stat.label}</h3>
                        <p className='text-2xl font-black'>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Charts Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Sales Chart */}
                <div className='lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-lg font-black uppercase tracking-wider'>Savdo Dinamikasi</h2>
                        <select className='bg-gray-50 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest cursor-pointer'>
                            <option>Haftalik</option>
                            <option>Oylik</option>
                        </select>
                    </div>
                    <div className='h-[350px] w-full'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesTrend}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#999' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#999' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '12px' }}
                                    labelStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', marginBottom: '4px' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#000" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className='bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm'>
                    <h2 className='text-lg font-black uppercase tracking-wider mb-8'>Trafik Manbasi</h2>
                    <div className='h-[250px] w-full relative'>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={trafficData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {trafficData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                            <div className='text-center'>
                                <p className='text-2xl font-black'>100%</p>
                                <p className='text-[8px] font-black uppercase text-gray-400 tracking-widest'>JAMI</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8 space-y-4'>
                        {trafficData.map((item, i) => (
                            <div key={i} className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-2 h-2 rounded-full' style={{ backgroundColor: item.color }} />
                                    <span className='text-xs font-bold uppercase tracking-wider'>{item.name}</span>
                                </div>
                                <span className='text-xs font-black'>{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Grid: Variants & Ranking */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Popular Sizes & Colors */}
                <div className='bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm'>
                    <h2 className='text-lg font-black uppercase tracking-wider mb-8'>O‘lcham va Ranglar AnalitIkasi</h2>
                    <div className='space-y-8'>
                        <div>
                            <p className='text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4'>Eng ko‘p sotilgan o‘lchamlar</p>
                            <div className='flex items-end gap-3 h-32'>
                                {variantData.map((item, i) => (
                                    <div key={i} className='flex-1 flex flex-col items-center gap-2'>
                                        <div
                                            className='w-full bg-gray-50 rounded-lg relative overflow-hidden group hover:bg-black transition-all cursor-pointer'
                                            style={{ height: `${(item.value / 120) * 100}%` }}
                                        >
                                            <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity' />
                                        </div>
                                        <span className='text-[10px] font-black'>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr className='border-gray-50' />
                        <div>
                            <p className='text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-4'>Eng ommabop ranglar</p>
                            <div className='flex gap-4'>
                                {colorData.map((color, i) => (
                                    <div key={i} className='flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl'>
                                        <div className='w-4 h-4 rounded-full border border-gray-200' style={{ backgroundColor: color.hex }} />
                                        <span className='text-[10px] font-black uppercase'>{color.name}</span>
                                        <span className='text-[10px] font-bold text-gray-400 ml-2'>{color.value} ta</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Products Rank */}
                <div className='bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm'>
                    <h2 className='text-lg font-black uppercase tracking-wider mb-8'>Eng ko‘p sotilgan mahsulotlar</h2>
                    <div className='space-y-6'>
                        {[
                            { name: 'Oversized Graphics T-Shirt', sales: 452, trend: '+12%', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80' },
                            { name: 'Slim Denim Jacket', sales: 289, trend: '+5%', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=200&q=80' },
                            { name: 'Classic Sneakers', sales: 156, trend: '-2%', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=200&q=80' },
                            { name: 'Essential Hoody', sales: 98, trend: '+20%', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=200&q=80' },
                        ].map((item, i) => (
                            <div key={i} className='flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group'>
                                <div className='flex items-center gap-4'>
                                    <span className='text-sm font-black text-gray-300 w-4'>{i + 1}</span>
                                    <div className='w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shadow-sm'>
                                        <img src={item.image} alt={item.name} className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all' />
                                    </div>
                                    <div>
                                        <p className='text-sm font-black uppercase'>{item.name}</p>
                                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{item.sales} ta sotildi</p>
                                    </div>
                                </div>
                                <div className={cn(
                                    'text-[10px] font-black px-2 py-1 rounded-lg',
                                    item.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'
                                )}>
                                    {item.trend}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant='outline' className='w-full mt-8 rounded-2xl h-12 border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer'>
                        Barcha mahsulotlar hisoboti
                    </Button>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
