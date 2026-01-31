"use client";

import { ArrowDown, ArrowRight, ArrowUp, Check } from 'lucide-react'
import React from 'react'
import { Input } from "@/shared/ui/input";

import FiltersIcon from "../../../../public/icons/filters.png";
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import Product from '@/widgets/product';


const HorizontalLine = () => {
    return (
        <hr className='border-gray-300' />
    )
}


export default function FilterPage() {
    const [isAll, setIsAll] = React.useState<boolean>(false);
    const [minPrice, setMinPrice] = React.useState<number>(50);
    const [maxPrice, setMaxPrice] = React.useState<number>(200);
    const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
    const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const categories = [
        "Classic", "Casual", "Oversize", "Streetwear", "Sport / Active",
        "Minimal", "Elegant", "Business", "Formal", "Old Money",
        "Y2K", "Urban", "Vintage", "Grunge", "Korean Style",
        "Romantic", "Chic", "Modest", "Luxury", "Daily Wear"
    ];

    const colors = ['#00C12B', '#F50606', '#F5DD06', '#F57906', '#06CAF5', '#063AF5', '#7D06F5', '#F506A4', '#FFFFFF', '#000000'];
    const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    return (
        <div className='min-h-screen container max-w-[1400px] py-10 px-4 md:px-6'>
            <div>
                <p className='text-gray-500 text-sm'>Home / Filters</p>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-12 mt-8'>
                <aside className='w-full lg:w-[310px] flex-shrink-0 lg:sticky lg:top-24'>
                    <div className='border border-gray-300 rounded-3xl bg-[#D6D3CC]/30 p-6 md:p-7' id='sidebar'>
                        <div className='flex items-center justify-between pb-6'>
                            <h1 className='font-bold text-2xl'>Filters</h1>
                            <Image src={FiltersIcon} alt='filter' width={22} height={22} className='cursor-pointer opacity-80 hover:opacity-100 transition-opacity' />
                        </div>

                        <HorizontalLine />

                        <div id='categories' className='mt-6 space-y-1.5'>
                            {
                                categories.map((item, index) => {
                                    if (isAll || index < 5) {
                                        return (
                                            <div key={index} className='flex items-center justify-between py-2.5 cursor-pointer hover:translate-x-1.5 transition-transform group'>
                                                <p className='text-gray-600 group-hover:text-black font-medium transition-colors'>{item}</p>
                                                <ArrowRight size={14} className='opacity-30 group-hover:opacity-100 transition-opacity' />
                                            </div>
                                        )
                                    }
                                    return null;
                                })
                            }
                            <div className="w-full pt-2">
                                <button
                                    onClick={() => setIsAll(!isAll)}
                                    className='text-center w-full flex items-center justify-center py-3 cursor-pointer hover:bg-black/5 rounded-xl transition-colors border border-dashed border-gray-300'
                                >
                                    {isAll ? <ArrowUp size={18} className="text-gray-400" /> : <ArrowDown size={18} className="text-gray-400" />}
                                </button>
                            </div>
                        </div>

                        <div className="mt-10">
                            <HorizontalLine />
                            <div className="py-7">
                                <h1 className="font-bold mb-6 uppercase tracking-widest text-xs text-gray-500">Narx</h1>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 ml-1">Min</p>
                                        <Input
                                            type="number"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(Number(e.target.value))}
                                            className="h-10 text-sm font-bold bg-white/50"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 ml-1">Max</p>
                                        <Input
                                            type="number"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                                            className="h-10 text-sm font-bold bg-white/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <HorizontalLine />
                            <div className="py-7">
                                <h1 className="font-bold mb-6 uppercase tracking-widest text-xs text-gray-500">Ranglar</h1>
                                <div className="flex flex-wrap gap-3">
                                    {colors.map((color, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                                            style={{ backgroundColor: color }}
                                            className={cn(
                                                "w-9 h-9 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:scale-115 transition-all ring-offset-2 flex items-center justify-center",
                                                selectedColor === color ? "ring-2 ring-black" : "hover:ring-2 hover:ring-black/20",
                                                color === '#FFFFFF' ? "border-gray-200" : "border-transparent"
                                            )}
                                        >
                                            {selectedColor === color && (
                                                <Check size={16} className={cn(color === '#FFFFFF' || color === '#F5DD06' ? "text-black" : "text-white")} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <HorizontalLine />
                            <div className="py-7">
                                <h1 className="font-bold mb-6 uppercase tracking-widest text-xs text-gray-500">O'lchamlar</h1>
                                <div className="flex flex-wrap gap-2.5">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => toggleSize(size)}
                                            className={cn(
                                                "px-5 py-2.5 rounded-full text-xs font-semibold transition-all border",
                                                selectedSizes.includes(size)
                                                    ? "bg-black text-white border-black"
                                                    : "bg-[#F0F0F0] text-gray-600 border-transparent hover:border-black"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button className="w-full mt-6 rounded-full py-7 font-bold text-base shadow-xl hover:shadow-2xl transition-all">
                            Filterlarni qo'llash
                        </Button>
                    </div>
                </aside>

                <main id='main-content' className='flex-1 w-full'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4'>
                        <h1 className='text-3xl md:text-4xl font-bold'>Streetwear</h1>
                        <div className='flex items-center gap-3 text-sm text-gray-500'>
                            <p>Showing {(currentPage - 1) * 9 + 1}-{Math.min(currentPage * 9, 100)} of 100 Products</p>
                            <span className="hidden md:block opacity-30 text-xl font-light">|</span>
                            <div className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors bg-white/50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                                <p>Sort by: <span className="font-bold text-black">Most Popular</span></p>
                                <ArrowDown size={14} className="mt-0.5" />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
                        {
                            Array.from({ length: 9 }).map((_, index) => (
                                <Product key={index + (currentPage - 1) * 9} />
                            ))
                        }
                    </div>

                    <div className="mt-12">
                        <HorizontalLine />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between py-12 gap-6">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="px-8 py-6 rounded-xl font-bold text-sm"
                        >
                            Oldingi
                        </Button>
                        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 sm:pb-0">
                            {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
                                <button
                                    key={i}
                                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                                    className={cn(
                                        "min-w-11 h-11 rounded-xl text-sm font-bold transition-all",
                                        currentPage === page
                                            ? "bg-black text-white shadow-lg scale-105"
                                            : "hover:bg-gray-100 text-gray-500 hover:text-black"
                                    )}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            disabled={currentPage === 10}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, 10))}
                            className="px-8 py-6 rounded-xl font-bold text-sm"
                        >
                            Keyingi
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    )
};