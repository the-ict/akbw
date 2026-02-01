'use client';

import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Pencil,
    Trash2,
    Eye,
    ArrowUpDown
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import AddProductModal from './add-product-modal';

// Mock Data
const products = [
    {
        id: '1',
        name: 'Oversized Graphics T-Shirt',
        category: 'T-Shirts',
        price: 45.00,
        stock: 124,
        status: 'Instock',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '2',
        name: 'Slim Fit Denim Jacket',
        category: 'Outerwear',
        price: 89.00,
        stock: 42,
        status: 'Low Stock',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '3',
        name: 'Classic White Sneakers',
        category: 'Shoes',
        price: 65.00,
        stock: 0,
        status: 'Out of Stock',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '4',
        name: 'Casual Chino Pants',
        category: 'Pants',
        price: 55.00,
        stock: 89,
        status: 'Instock',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    },
];

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className='space-y-6'>
            {/* Header / Actions */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-black uppercase tracking-tight'>Mahsulotlar</h1>
                    <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Barcha mahsulotlarni boshqarish</p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className='rounded-2xl bg-black text-white px-6 py-6 h-auto font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95 cursor-pointer'
                >
                    <Plus size={18} />
                    Mahsulot qo‘shish
                </Button>
            </div>

            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            {/* Filter Bar */}
            <div className='bg-white p-4 rounded-[24px] border border-gray-100 flex flex-col md:flex-row gap-4 items-center shadow-sm'>
                <div className='relative flex-1 w-full'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                    <Input
                        placeholder='Mahsulot nomini qidiring...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pl-12 h-12 bg-gray-50 border-none rounded-2xl text-sm focus-visible:ring-1 focus-visible:ring-black/5'
                    />
                </div>
                <div className='flex items-center gap-3 w-full md:w-auto'>
                    <Button variant='outline' className='rounded-2xl border-gray-100 h-12 px-6 flex items-center gap-2 font-bold text-xs uppercase cursor-pointer'>
                        <Filter size={16} />
                        Filter
                    </Button>
                    <select className='bg-gray-50 border-none rounded-2xl h-12 px-6 text-xs font-bold uppercase focus:ring-0 cursor-pointer flex-1 md:flex-none'>
                        <option>Barcha Kategoriyalar</option>
                        <option>T-Shirts</option>
                        <option>Outerwear</option>
                        <option>Shoes</option>
                    </select>
                </div>
            </div>

            {/* Product Table */}
            <div className='bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm'>
                <div className='overflow-x-auto no-scrollbar'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-gray-50/50 border-b border-gray-100'>
                                <th className='px-6 py-4 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Mahsulot
                                </th>
                                <th className='px-6 py-4 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Kategoriya
                                </th>
                                <th className='px-6 py-4 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    <div className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                                        Narx <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className='px-6 py-4 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Stok
                                </th>
                                <th className='px-6 py-4 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Status
                                </th>
                                <th className='px-6 py-4 text-right text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Amallar
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-50'>
                            {products.map((product) => (
                                <tr key={product.id} className='hover:bg-gray-50/50 transition-colors group'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden relative border border-gray-50'>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className='object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110'
                                                />
                                            </div>
                                            <div>
                                                <p className='text-sm font-bold tracking-tight'>{product.name}</p>
                                                <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>ID: #{product.id}2938</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span className='text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-gray-100 rounded-full text-gray-500'>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 font-black text-sm'>
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span className='text-sm font-bold text-gray-600'>
                                            {product.stock} dona
                                        </span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className={cn(
                                            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest',
                                            product.status === 'Instock' ? 'bg-green-50 text-green-600' :
                                                product.status === 'Low Stock' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-red-50 text-red-600'
                                        )}>
                                            <span className={cn(
                                                'w-1.5 h-1.5 rounded-full',
                                                product.status === 'Instock' ? 'bg-green-500' :
                                                    product.status === 'Low Stock' ? 'bg-orange-500' :
                                                        'bg-red-500'
                                            )} />
                                            {product.status}
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-right'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 rounded-xl hover:bg-gray-100 cursor-pointer">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className='rounded-2xl border-gray-100 p-2 shadow-xl'>
                                                <DropdownMenuLabel className='text-[10px] uppercase tracking-widest font-black text-gray-400 px-3 py-2'>Amallar</DropdownMenuLabel>
                                                <DropdownMenuItem className='rounded-xl gap-3 px-3 py-2 cursor-pointer'>
                                                    <Eye size={16} className='text-gray-400' />
                                                    <span className='text-xs font-bold uppercase tracking-wider'>Ko‘rish</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className='rounded-xl gap-3 px-3 py-2 cursor-pointer'>
                                                    <Pencil size={16} className='text-gray-400' />
                                                    <span className='text-xs font-bold uppercase tracking-wider'>Tahrirlash</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className='bg-gray-50' />
                                                <DropdownMenuItem className='rounded-xl gap-3 px-3 py-2 text-red-500 hover:bg-red-50 cursor-pointer'>
                                                    <Trash2 size={16} />
                                                    <span className='text-xs font-bold uppercase tracking-wider'>O‘chirish</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className='px-8 py-6 bg-gray-50/50 flex justify-between items-center border-t border-gray-100'>
                    <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>
                        Ko‘rsatilmoqda <span className='text-black'>1 - 10</span> gacha <span className='text-black'>45</span> tadan
                    </p>
                    <div className='flex items-center gap-2'>
                        <Button variant='outline' disabled className='rounded-xl h-10 px-4 border-gray-200 font-bold text-xs uppercase'>Oldingi</Button>
                        <Button variant='outline' className='rounded-xl h-10 px-4 border-gray-200 bg-white shadow-sm font-bold text-xs uppercase cursor-pointer'>Keyingi</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Utility for concatenating classes
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
