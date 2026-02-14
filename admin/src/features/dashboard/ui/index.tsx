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
import { useDashboardData, useStatisticsData } from '../lib/hooks';
import { useOrders } from '../../orders/lib/hooks';

export default function Dashboard() {
    const [dayRange, setDayRange] = React.useState(7);
    const { data: dashboardData, isLoading: isDashboardLoading } = useDashboardData(dayRange);
    const { data: statsData, isLoading: isStatsLoading } = useStatisticsData(dayRange);
    const { data: ordersData, isLoading: isOrdersLoading } = useOrders();

    if (isDashboardLoading || isStatsLoading || isOrdersLoading) {
        return <div className='flex items-center justify-center min-h-[400px]'>
            <div className='animate-pulse text-gray-400 font-bold uppercase tracking-widest'>Yuklanmoqda...</div>
        </div>;
    }

    const stats = [
        {
            title: 'Umumiy Savdo',
            value: `${(dashboardData?.overAllSales?._sum?.total_price || 0).toLocaleString()} so'm`,
            change: '+0%', // Can be calculated if we fetch and compare
            isUp: true,
            icon: DollarSign,
            color: 'bg-green-500',
        },
        {
            title: 'Buyurtmalar',
            value: dashboardData?.ordersNumber || 0,
            change: `${(dashboardData?.grownPercentsAtOrders || 0).toFixed(1)}%`,
            isUp: (dashboardData?.grownPercentsAtOrders || 0) >= 0,
            icon: ShoppingBag,
            color: 'bg-blue-500',
        },
        {
            title: 'Mijozlar',
            value: dashboardData?.usersNumber || 0,
            change: '+0%',
            isUp: true,
            icon: Users,
            color: 'bg-purple-500',
        },
        {
            title: 'O‘sish sur’ati',
            value: `${(dashboardData?.grownPercentsAtOrders || 0).toFixed(1)}%`,
            change: '+0%',
            isUp: true,
            icon: TrendingUp,
            color: 'bg-orange-500',
        },
    ];

    const chartData = (dayRange === 7 ? statsData?.weekSales : statsData?.monthSales)?.map(item => ({
        name: item.date.split('-').slice(1).reverse().join('.'), // Format DD.MM
        sales: item.count
    })).reverse() || [];

    const recentOrders = ordersData?.data?.slice(0, 5) || [];
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
                            <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>{dayRange === 7 ? 'Haftalik' : 'Oylik'} hisobot</p>
                        </div>
                        <select
                            value={dayRange}
                            onChange={(e) => setDayRange(Number(e.target.value))}
                            className='bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold uppercase focus:ring-0 cursor-pointer'
                        >
                            <option value={7}>Oxirgi 7 kun</option>
                            <option value={30}>Oxirgi 30 kun</option>
                        </select>
                    </div>

                    <div className='h-[350px] w-full'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
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
                                    tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 900 }}
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

                <div className='bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm'>
                    <h2 className='text-lg font-black uppercase tracking-wider mb-6'>Oxirgi Buyurtmalar</h2>
                    <div className='space-y-6'>
                        {recentOrders.map((order: any) => (
                            <div key={order.id} className='flex items-center justify-between group hover:bg-gray-50/50 p-2 rounded-2xl transition-all cursor-pointer'>
                                <div className='flex items-center gap-4'>
                                    <div className='w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-black group-hover:text-white transition-all overflow-hidden'>
                                        <div className='text-xs'>O-{order.id}</div>
                                    </div>
                                    <div>
                                        <p className='text-sm font-bold uppercase'>{order.user?.name} {order.user?.lastName}</p>
                                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-sm font-black'>{(order.total_price || 0).toLocaleString()} so'm</p>
                                    <p className={cn(
                                        'text-[10px] font-bold uppercase tracking-widest',
                                        order.status === 'paid' ? 'text-green-500' : 'text-orange-400'
                                    )}>{order.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => window.location.replace('/orders')}
                        className='w-full mt-8 py-4 border-2 border-gray-50 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer'
                    >
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
