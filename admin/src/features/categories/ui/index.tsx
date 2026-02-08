'use client';

import React from 'react';
import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Layers,
    Eye,
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
import { useParams } from 'next/navigation';
import DeleteConfirmModal from '../../products/ui/delete-confirm-modal';
import AddCategoryModal from './add-category-modal';
import { useCategories, useDeleteCategory } from '../lib/hooks';
import { ICategory } from '@/shared/config/api/product/product.modal';


export default function Categories() {
    const params = useParams();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [page, setPage] = React.useState(1);

    const { data: categories = [], isLoading } = useCategories(searchQuery || undefined);
    const deleteMutation = useDeleteCategory();

    const [open, setOpen] = React.useState(false);
    const [editingCategory, setEditingCategory] = React.useState<ICategory | null>(null);
    const [deletingCategory, setDeletingCategory] = React.useState<ICategory | null>(null);
    const [viewOnly, setViewOnly] = React.useState(false);

    const handleEdit = (category: ICategory) => {
        setEditingCategory(category);
        setViewOnly(false);
        setOpen(true);
    };

    const handleView = (category: ICategory) => {
        setEditingCategory(category);
        setViewOnly(true);
        setOpen(true);
    };

    const handleDelete = (category: ICategory) => {
        setDeletingCategory(category);
    };

    const confirmDelete = async () => {
        if (deletingCategory) {
            await deleteMutation.mutateAsync(deletingCategory.id);
            setDeletingCategory(null);
        }
    };

    if (isLoading) return <div className='p-8 font-black uppercase tracking-widest text-xs text-gray-400'>Yuklanmoqda...</div>;

    return (
        <div className='space-y-6'>
            {/* Header / Actions */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-black uppercase tracking-tight'>Kategoriyalar</h1>
                    <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Mahsulot kategoriyalarini boshqarish</p>
                </div>
                <Button
                    onClick={() => {
                        setEditingCategory(null);
                        setViewOnly(false);
                        setOpen(true);
                    }}
                    className='rounded-2xl bg-black text-white px-6 py-6 h-auto font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95 cursor-pointer'
                >
                    <Plus size={18} />
                    Kategoriya qo‘shish
                </Button>
            </div>

            <AddCategoryModal
                isOpen={open}
                category={editingCategory}
                viewOnly={viewOnly}
                onClose={() => {
                    setOpen(false);
                    setEditingCategory(null);
                    setViewOnly(false);
                }}
            />

            <DeleteConfirmModal
                isOpen={!!deletingCategory}
                onClose={() => setDeletingCategory(null)}
                onConfirm={confirmDelete}
                title="Kategoriyani o‘chirasizmi?"
                description={`Siz haqiqatan ham "${deletingCategory?.name}" kategoriyasini o‘chirmoqchimisiz? Bu kategoriya ostidagi mahsulotlar kategoriya-siz qolishi mumkin.`}
            />

            {/* Filter Bar */}
            <div className='bg-white p-4 rounded-[24px] border border-gray-100 flex flex-col md:flex-row gap-4 items-center shadow-sm'>
                <div className='relative flex-1 w-full'>
                    <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                    <Input
                        placeholder='Kategoriya nomini qidiring...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pl-12 h-12 bg-gray-50 border-none rounded-2xl text-sm focus-visible:ring-1 focus-visible:ring-black/5'
                    />
                </div>
            </div>

            {/* Categories Table */}
            <div className='bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm'>
                <div className='overflow-x-auto no-scrollbar'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-gray-50/50 border-b border-gray-100'>
                                <th className='px-6 py-4 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Kategoriya
                                </th>
                                <th className='px-6 py-4 text-left text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    ID
                                </th>
                                <th className='px-6 py-4 text-right text-[10px] uppercase tracking-[0.2em] font-black text-gray-400'>
                                    Amallar
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-50'>
                            {categories.map((category) => (
                                <tr key={category.id} className='hover:bg-gray-50/50 transition-colors group'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all'>
                                                <Layers size={20} />
                                            </div>
                                            <div>
                                                <p className='text-sm font-bold tracking-tight'>{category.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 font-black text-xs text-gray-400 uppercase tracking-widest'>
                                        #{category.id}
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
                                                    onClick={() => handleView(category)}
                                                    className='rounded-xl gap-3 px-3 py-2 cursor-pointer'
                                                >
                                                    <Eye size={16} className='text-gray-400' />
                                                    <span className='text-xs font-bold uppercase tracking-wider'>Ko‘rish</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleEdit(category)}
                                                    className='rounded-xl gap-3 px-3 py-2 cursor-pointer'
                                                >
                                                    <Pencil size={16} className='text-gray-400' />
                                                    <span className='text-xs font-bold uppercase tracking-wider'>Tahrirlash</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className='bg-gray-50' />
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(category)}
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
            </div>
        </div>
    );
}

