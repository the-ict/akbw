'use client';

import React from 'react';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
];

const stats = [
    {
        title: 'Umumiy Savdo',
        value: '$12,450',
        change: '+12.5%',
        isUp: true,
        icon: DollarSign,
        color: 'bg-green-500',
    },
    {
        title: 'Buyurtmalar',
        value: '456',
        change: '+18.2%',
        isUp: true,
        icon: ShoppingBag,
        color: 'bg-blue-500',
    },
    {
        title: 'Mijozlar',
        value: '1,234',
        change: '-2.4%',
        isUp: false,
        icon: Users,
        color: 'bg-purple-500',
    },
    {
        title: 'O‘sish sur’ati',
        value: '+24.5%',
        change: '+4.3%',
        isUp: true,
        icon: TrendingUp,
        color: 'bg-orange-500',
    },
];

export default function Dashboard() {
    return (
        <div className='space-y-8 pb-10'>
            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className='bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all group'>
                            <div className='flex justify-between items-start mb-4'>
                                <div className={cn('p-3 rounded-2xl text-white shadow-lg', stat.color)}>
                                    <Icon size={20} />
                                </div>
                                <div className={cn(
                                    'flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full',
                                    stat.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                )}>
                                    {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className='text-gray-400 text-xs font-bold uppercase tracking-widest mb-1'>
                                {stat.title}
                            </h3>
                            <p className='text-2xl font-black tracking-tight'>
                                {stat.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Sales Chart */}
                <div className='lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm'>
                    <div className='flex justify-between items-center mb-8'>
                        <div>
                            <h2 className='text-lg font-black uppercase tracking-wider'>Savdo Grafikasi</h2>
                            <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Haftalik hisobot</p>
                        </div>
                        <select className='bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold uppercase focus:ring-0 cursor-pointer'>
                            <option>Oxirgi 7 kun</option>
                            <option>Oxirgi 30 kun</option>
                        </select>
                    </div>

                    <div className='h-[350px] w-full'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#000" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    hide
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                        padding: '12px 16px'
                                    }}
                                    labelStyle={{ fontWeight: 800, marginBottom: '4px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#000"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity / Side List */}
                <div className='bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm'>
                    <h2 className='text-lg font-black uppercase tracking-wider mb-6'>Oxirgi Buyurtmalar</h2>
                    <div className='space-y-6'>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className='flex items-center justify-between group hover:bg-gray-50/50 p-2 rounded-2xl transition-all cursor-pointer'>
                                <div className='flex items-center gap-4'>
                                    <div className='w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-black group-hover:text-white transition-all overflow-hidden'>
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item}`} alt="avatar" />
                                    </div>
                                    <div>
                                        <p className='text-sm font-bold uppercase'>Mijoz #{1234 + item}</p>
                                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Bugun, 14:20</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-sm font-black'>$120.00</p>
                                    <p className='text-[10px] text-green-500 font-bold uppercase tracking-widest'>To‘landi</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className='w-full mt-8 py-4 border-2 border-gray-50 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer'>
                        Barchasini ko‘rish
                    </button>
                </div>
            </div>
        </div>
    );
}

// Utility for concatenating classes
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
