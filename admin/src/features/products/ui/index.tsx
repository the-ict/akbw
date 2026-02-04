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
import DeleteConfirmModal from './delete-confirm-modal';

import { useProducts, useDeleteProduct } from '../lib/hooks';
import { Product } from '../lib/api';

export default function Products() {
    const { data: products = [], isLoading } = useProducts();
    const deleteMutation = useDeleteProduct();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Barcha Kategoriyalar');
    const [selectedStatus, setSelectedStatus] = useState('Barcha Statuslar');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
    const [isViewOnly, setIsViewOnly] = useState(false);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Barcha Kategoriyalar' || product.categories.some(c => c.name === selectedCategory);
        // Status is not explicitly in the backend yet, defaulting to Instock
        const status = 'Instock';
        const matchesStatus = selectedStatus === 'Barcha Statuslar' || status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsViewOnly(false);
        setIsAddModalOpen(true);
    };

    const handleView = (product: Product) => {
        setEditingProduct(product);
        setIsViewOnly(true);
        setIsAddModalOpen(true);
    };

    const handleDelete = (product: Product) => {
        setDeletingProduct(product);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        setEditingProduct(null);
        setIsViewOnly(false);
    };

    const confirmDelete = async () => {
        if (deletingProduct) {
            await deleteMutation.mutateAsync(deletingProduct.id);
            setDeletingProduct(null);
        }
    };

    if (isLoading) return <div>Yuklanmoqda...</div>;

    return (
        <div className='space-y-6'>
            {/* Header / Actions */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-black uppercase tracking-tight'>Mahsulotlar</h1>
                    <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Barcha mahsulotlarni boshqarish</p>
                </div>
                <Button
                    onClick={() => {
                        setIsViewOnly(false);
                        setIsAddModalOpen(true);
                    }}
                    className='rounded-2xl bg-black text-white px-6 py-6 h-auto font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95 cursor-pointer'
                >
                    <Plus size={18} />
                    Mahsulot qo‘shish
                </Button>
            </div>

            <AddProductModal
                isOpen={isAddModalOpen}
                product={editingProduct}
                viewOnly={isViewOnly}
                onClose={handleCloseAddModal}
            />

            <DeleteConfirmModal
                isOpen={!!deletingProduct}
                onClose={() => setDeletingProduct(null)}
                onConfirm={confirmDelete}
                title="Mahsulotni o‘chirasizmi?"
                description={`Siz haqiqatan ham "${deletingProduct?.name}" mahsulotini o‘chirmoqchimisiz? Bu amalni ortga qaytarib bo‘lmaydi.`}
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='rounded-2xl border-gray-100 h-12 px-6 flex items-center gap-2 font-bold text-xs uppercase cursor-pointer'>
                                <Filter size={16} />
                                {selectedStatus === 'Barcha Statuslar' ? 'Filter' : selectedStatus}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='rounded-2xl border-gray-100 p-2 shadow-xl min-w-[200px]'>
                            <DropdownMenuLabel className='text-[10px] uppercase tracking-widest font-black text-gray-400 px-3 py-2'>Status bo'yicha</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedStatus('Barcha Statuslar')} className='rounded-xl px-3 py-2 cursor-pointer text-xs font-bold uppercase'>Barcha Statuslar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedStatus('Instock')} className='rounded-xl px-3 py-2 cursor-pointer text-xs font-bold uppercase'>Instock</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedStatus('Low Stock')} className='rounded-xl px-3 py-2 cursor-pointer text-xs font-bold uppercase'>Low Stock</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedStatus('Out of Stock')} className='rounded-xl px-3 py-2 cursor-pointer text-xs font-bold uppercase'>Out of Stock</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className='bg-gray-50 border-none rounded-2xl h-12 px-6 text-xs font-bold uppercase focus:ring-0 cursor-pointer flex-1 md:flex-none'
                    >
                        <option value="Barcha Kategoriyalar">Barcha Kategoriyalar</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Outerwear">Outerwear</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Pants">Pants</option>
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
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className='hover:bg-gray-50/50 transition-colors group'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden relative border border-gray-50'>
                                                <img
                                                    src={product.product_images?.[0] || ''}
                                                    alt={product.name}
                                                    className='object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110'
                                                />
                                            </div>
                                            <div>
                                                <p className='text-sm font-bold tracking-tight'>{product.name}</p>
                                                <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>ID: #{product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex flex-wrap gap-1'>
                                            {product.categories.map(cat => (
                                                <span key={cat.id} className='text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-gray-100 rounded-full text-gray-500'>
                                                    {cat.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 font-black text-sm'>
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span className='text-sm font-bold text-gray-600'>
                                            0 dona
                                        </span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className={cn(
                                            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest',
                                            'bg-green-50 text-green-600'
                                        )}>
                                            <span className={cn(
                                                'w-1.5 h-1.5 rounded-full',
                                                'bg-green-500'
                                            )} />
                                            Instock
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
                                                <DropdownMenuItem
                                                    onClick={() => handleView(product)}
                                                    className='rounded-xl gap-3 px-3 py-2 cursor-pointer'
                                                >
                                                    <Eye size={16} className='text-gray-400' />
                                                    <span className='text-xs font-bold uppercase tracking-wider'>Ko‘rish</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleEdit(product)}
                                                    className='rounded-xl gap-3 px-3 py-2 cursor-pointer'
                                                >
                                                    <Pencil size={16} className='text-gray-400' />
                                                    <span className='text-xs font-bold uppercase tracking-wider'>Tahrirlash</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className='bg-gray-50' />
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(product)}
                                                    className='rounded-xl gap-3 px-3 py-2 text-red-500 hover:bg-red-50 cursor-pointer'
                                                >
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
