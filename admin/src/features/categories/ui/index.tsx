'use client';

import React,
{
    useState
} from 'react';
import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Layers,
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
import AddCategoryModal from './add-category-modal';
import DeleteConfirmModal from '../../products/ui/delete-confirm-modal';

// Mock Data
const initialCategories = [
    { id: '1', name: 'T-Shirts', productCount: 124, status: 'Active' },
    { id: '2', name: 'Outerwear', productCount: 42, status: 'Active' },
    { id: '3', name: 'Shoes', productCount: 65, status: 'Active' },
    { id: '4', name: 'Pants', productCount: 89, status: 'Active' },
    { id: '5', name: 'Accessories', productCount: 210, status: 'Inactive' },
];

export default function Categories() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState(initialCategories);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<typeof initialCategories[0] | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<typeof initialCategories[0] | null>(null);
    const [isViewOnly, setIsViewOnly] = useState(false);

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (category: typeof initialCategories[0]) => {
        setEditingCategory(category);
        setIsViewOnly(false);
        setIsAddModalOpen(true);
    };

    const handleView = (category: typeof initialCategories[0]) => {
        setEditingCategory(category);
        setIsViewOnly(true);
        setIsAddModalOpen(true);
    };

    const handleDelete = (category: typeof initialCategories[0]) => {
        setDeletingCategory(category);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingCategory(null);
        setIsViewOnly(false);
    };

    const confirmDelete = () => {
        // Logic to delete category
        setDeletingCategory(null);
    };

    return (
        <div className='space-y-6'>
            {/* Header / Actions */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-black uppercase tracking-tight'>Kategoriyalar</h1>
                    <p className='text-xs text-gray-400 font-bold uppercase tracking-widest'>Mahsulot kategoriyalarini boshqarish</p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className='rounded-2xl bg-black text-white px-6 py-6 h-auto font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95 cursor-pointer'
                >
                    <Plus size={18} />
                    Kategoriya qo‘shish
                </Button>
            </div>

            <AddCategoryModal
                isOpen={isAddModalOpen}
                category={editingCategory}
                viewOnly={isViewOnly}
                onClose={handleCloseModal}
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
                                    Mahsulotlar soni
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
                            {filteredCategories.map((category) => (
                                <tr key={category.id} className='hover:bg-gray-50/50 transition-colors group'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all'>
                                                <Layers size={20} />
                                            </div>
                                            <div>
                                                <p className='text-sm font-bold tracking-tight'>{category.name}</p>
                                                <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>ID: #{category.id}00</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span className='text-sm font-bold text-gray-600'>
                                            {category.productCount} ta mahsulot
                                        </span>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className={cn(
                                            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest',
                                            category.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                        )}>
                                            <span className={cn(
                                                'w-1.5 h-1.5 rounded-full',
                                                category.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                                            )} />
                                            {category.status}
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

// Utility for concatenating classes
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
