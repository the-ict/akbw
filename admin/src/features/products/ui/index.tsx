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
import { cn } from '@/shared/lib/utils';

import { useProducts, useDeleteProduct, useCategories } from '../lib/hooks';
import { Product } from '../lib/api';

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const { data: productsData, isLoading } = useProducts({
        q: searchQuery || undefined,
        category_id: selectedCategoryId === 'all' ? undefined : selectedCategoryId,
        page,
        limit,
        sortBy,
        sortOrder
    });

    const products = productsData?.data || [];
    const meta = productsData?.meta;

    const { data: categories = [] } = useCategories();
    const deleteMutation = useDeleteProduct();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
    const [isViewOnly, setIsViewOnly] = useState(false);

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

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
        setPage(1);
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
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        className='pl-12 h-12 bg-gray-50 border-none rounded-2xl text-sm focus-visible:ring-1 focus-visible:ring-black/5'
                    />
                </div>
                <div className='flex items-center gap-3 w-full md:w-auto'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='rounded-2xl border-gray-100 h-12 px-6 flex items-center gap-2 font-bold text-xs uppercase cursor-pointer'>
                                <Filter size={16} />
                                {selectedCategoryId === 'all' ? 'Barcha Kategoriyalar' : categories.find(c => c.id.toString() === selectedCategoryId)?.name}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='rounded-2xl border-gray-100 p-2 shadow-xl min-w-[200px]'>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedCategoryId('all');
                                    setPage(1);
                                }}
                                className='rounded-xl px-3 py-2 cursor-pointer text-xs font-bold uppercase'
                            >
                                Barcha Kategoriyalar
                            </DropdownMenuItem>
                            {categories.map(cat => (
                                <DropdownMenuItem
                                    key={cat.id}
                                    onClick={() => {
                                        setSelectedCategoryId(cat.id.toString());
                                        setPage(1);
                                    }}
                                    className='rounded-xl px-3 py-2 cursor-pointer text-xs font-bold uppercase'
                                >
                                    {cat.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                                    <div
                                        className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'
                                        onClick={() => handleSort('price')}
                                    >
                                        Narx <ArrowUpDown size={12} className={sortBy === 'price' ? 'text-black' : 'text-gray-300'} />
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
                {meta && meta.totalPages > 1 && (
                    <div className='px-8 py-6 bg-gray-50/50 flex justify-between items-center border-t border-gray-100'>
                        <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>
                            Ko‘rsatilmoqda <span className='text-black'>{((page - 1) * limit) + 1} - {Math.min(page * limit, meta.total)}</span> gacha <span className='text-black'>{meta.total}</span> tadan
                        </p>
                        <div className='flex items-center gap-2'>
                            <Button
                                variant='outline'
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className='rounded-xl h-10 px-4 border-gray-200 font-bold text-xs uppercase cursor-pointer disabled:opacity-50'
                            >
                                Oldingi
                            </Button>
                            <div className='flex items-center gap-1'>
                                {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(p => (
                                    <Button
                                        key={p}
                                        variant={page === p ? 'default' : 'outline'}
                                        onClick={() => setPage(p)}
                                        className={cn(
                                            'w-10 h-10 rounded-xl font-bold text-xs cursor-pointer',
                                            page === p ? 'bg-black text-white shadow-lg' : 'bg-white border-gray-200'
                                        )}
                                    >
                                        {p}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant='outline'
                                disabled={page === meta.totalPages}
                                onClick={() => setPage(page + 1)}
                                className='rounded-xl h-10 px-4 border-gray-200 bg-white shadow-sm font-bold text-xs uppercase cursor-pointer disabled:opacity-50'
                            >
                                Keyingi
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
