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
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {
    Button
} from '@/shared/ui/button';

import {
    useStatisticsData
} from '../lib/hooks';

export default function Statistics() {
    const [dayRange, setDayRange] = React.useState(30);
    const { data: statsData, isLoading } = useStatisticsData(dayRange);

    if (isLoading) {
        return <div className='flex items-center justify-center min-h-[400px]'>
            <div className='animate-pulse text-gray-400 font-bold uppercase tracking-widest'>Yuklanmoqda...</div>
        </div>;
    }

    const salesTrend = (dayRange === 7 ? statsData?.weekSales : statsData?.monthSales)?.map(item => ({
        name: item.date.split('-').slice(1).reverse().join('.'),
        sales: item.count
    })).reverse() || [];

    const topStats = [
        { label: 'O‘rtacha Chek', value: `${(statsData?.averageCheckPrice || 0).toLocaleString()} so'm`, change: '+0%', up: true, icon: Target },
        { label: 'Kunlik Savdo', value: `${(statsData?.dailyAverageOrdersPrice || 0).toLocaleString()} so'm`, change: '+0%', up: true, icon: DollarSign },
        { label: 'Oylik Buyurtma', value: statsData?.monthsOrdersNumber || 0, change: '+0%', up: true, icon: ShoppingBag },
        { label: 'Yangi Mijoz', value: statsData?.newUserCount || 0, change: '+0%', up: true, icon: Users },
    ];

    const variantData = statsData?.mostSoldSizes?.map(s => ({
        name: s.details?.name || s.sizeId,
        value: s._sum.quantity
    })) || [];

    const maxVariantValue = Math.max(...variantData.map(v => v.value), 1);

    const colorData = statsData?.mostSoldColors?.map(c => ({
        name: c.details?.name || c.colorId,
        value: c._sum.quantity,
        hex: c.details?.color_hex || '#000'
    })) || [];

    const trafficData = [
        { name: 'Instagram', value: 45, color: '#000000', icon: Instagram },
        { name: 'Telegram', value: 30, color: '#333333', icon: Send },
        { name: 'Direct', value: 25, color: '#666666', icon: MousePointer2 },
    ];
    return (
        <div className='space-y-8 pb-10'>
            <div>
                <h1 className='text-2xl font-black uppercase tracking-tight'>Statistika</h1>
                <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Ma’lumotlar asosida qaror qabul qiling</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {topStats.map((stat, i) => (
                    <div key={i} className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm'>
                        <div className='flex justify-between items-start mb-4'>
                            <div className='p-3 bg-gray-50 rounded-2xl'>
                                <stat.icon size={20} className='text-black' />
                            </div>
                        </div>
                        <h3 className='text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1'>{stat.label}</h3>
                        <p className='text-2xl font-black'>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-lg font-black uppercase tracking-wider'>Savdo Dinamikasi</h2>
                        <select
                            value={dayRange}
                            onChange={(e) => setDayRange(Number(e.target.value))}
                            className='bg-gray-50 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest cursor-pointer'
                        >
                            <option value={7}>Haftalik</option>
                            <option value={30}>Oylik</option>
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

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
                                            style={{ height: `${(item.value / maxVariantValue) * 100}%` }}
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
                            <div className='flex flex-wrap gap-4'>
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
                        {statsData?.mostSoldProducts?.map((item, i) => (
                            <div key={i} className='flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group'>
                                <div className='flex items-center gap-4'>
                                    <span className='text-sm font-black text-gray-300 w-4'>{i + 1}</span>
                                    <div className='w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shadow-sm'>
                                        <img src={item.details?.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=200&q=80'} alt={item.details?.translations?.[0]?.name} className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all' />
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-sm font-black uppercase line-clamp-1'>{item.details?.translations?.[0]?.name || 'Mahsulot'}</p>
                                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{item._sum.quantity} ta sotildi</p>
                                    </div>
                                </div>
                                <div className='text-[10px] font-black px-2 py-1 rounded-lg text-green-600'>
                                    +0%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Button variant='outline' className='w-full mt-8 rounded-2xl h-12 border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer'>
                Barcha mahsulotlar hisoboti
            </Button>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
