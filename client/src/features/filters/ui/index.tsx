'use client';

import { ArrowDown, ArrowUp, Check, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/shared/ui/input';
import React, { useEffect } from 'react';

import FiltersIcon from '../../../../public/icons/filters.png';
import { useCategories } from '@/widgets/navbar/lib/hooks';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import Product from '@/widgets/product';
import Image from 'next/image';
import { useColors, useSizes, useProducts } from '../lib/hooks';
import { IProductFilters } from '@/shared/config/api/product/product.model';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

const HorizontalLine = () => {
  return <hr className="border-gray-300" />;
};

export default function FilterPage() {
  const searchParams = useSearchParams();
  const categoryParam =
    searchParams.get('category') || searchParams.get('category_id');
  const searchParam = searchParams.get('q');
  const [isAll, setIsAll] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<
    string | null | number
  >(categoryParam);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else if (searchParam) {
      setSelectedCategory(null);
    }
  }, [categoryParam, searchParam]);
  const [minPrice, setMinPrice] = React.useState<number>(50);
  const [maxPrice, setMaxPrice] = React.useState<number>(200);
  const [selectedColor, setSelectedColor] = React.useState<number | null>(null);
  const [selectedSizes, setSelectedSizes] = React.useState<number[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [openPagination, setOpenPagination] = React.useState<boolean>(false);

  const [sortBy, setSortBy] = React.useState<string>('createdAt');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');

  const [appliedFilters, setAppliedFilters] = React.useState<IProductFilters>({
    category_id: categoryParam || undefined,
    q: searchParam || undefined,
    page: 1,
    limit: 9,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  useEffect(() => {
    setAppliedFilters((prev) => ({
      ...prev,
      category_id:
        searchParams.get('category') ||
        searchParams.get('category_id') ||
        undefined,
      q: searchParam || undefined,
      page: 1,
    }));
  }, [searchParams, searchParam]);

  const { data: categories, isLoading } = useCategories();
  const { data: colors, isLoading: colorsLoading } = useColors();
  const { data: sizes, isLoading: sizesLoading } = useSizes();

  const { data: productsData, isLoading: productsLoading } =
    useProducts(appliedFilters);

  const handleApplyFilters = () => {
    setAppliedFilters({
      category_id: selectedCategory?.toString(),
      color_id: selectedColor?.toString(),
      size_id: selectedSizes.join(','),
      min_price: minPrice,
      max_price: maxPrice,
      sortBy,
      sortOrder,
      page: 1,
      limit: 9,
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    setAppliedFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  }, [sortBy, sortOrder]);

  const toggleSize = (size: number) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen container py-10 px-4 md:px-6">
      <div>
        <p className="text-gray-500 text-sm">Home / Filters</p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-12 mt-8">
        <aside className="w-full lg:w-[310px] flex-shrink-0 lg:sticky lg:top-24">
          <div
            className="border border-gray-300 rounded-3xl bg-[#D6D3CC]/30 p-6 md:p-7"
            id="sidebar"
          >
            <div className="flex items-center justify-between pb-6">
              <h1 className="font-bold text-2xl">Filters</h1>
              <Image
                src={FiltersIcon}
                alt="filter"
                width={22}
                height={22}
                className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>

            <HorizontalLine />

            <div id="categories" className="mt-6 space-y-1.5">
              {categories
                ?.filter((c) => !c.parentId)
                .map((item, index) => {
                  const isActive = Number(selectedCategory) === item.id;
                  const hasActiveChild = item.children?.some(
                    (child) => Number(selectedCategory) === child.id,
                  );
                  const isExpanded = isActive || hasActiveChild;

                  if (isAll || index < 5 || isActive || hasActiveChild) {
                    return (
                      <div key={index} className="space-y-1.5">
                        <div
                          onClick={() =>
                            setSelectedCategory(isActive ? null : item.id)
                          }
                          className={cn(
                            'flex items-center justify-between py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 group',
                            isActive
                              ? 'bg-black text-white shadow-lg shadow-black/10'
                              : 'hover:bg-white/60 bg-white/20',
                          )}
                        >
                          <p
                            className={cn(
                              'font-semibold tracking-tight transition-colors text-sm',
                              isActive
                                ? 'text-white'
                                : 'text-gray-700 group-hover:text-black',
                            )}
                          >
                            {item.name}
                          </p>
                          <div
                            className={cn(
                              'transition-transform duration-300',
                              isExpanded ? 'rotate-180' : '',
                            )}
                          >
                            <ChevronDown
                              size={16}
                              className={cn(
                                'transition-opacity',
                                isActive
                                  ? 'opacity-100'
                                  : 'opacity-40 group-hover:opacity-100',
                              )}
                            />
                          </div>
                        </div>
                        {item.children && isExpanded && (
                          <div className="ml-5 border-l-2 border-black/5 pl-3 space-y-1.5 py-1">
                            {item.children.map((child, cIdx) => {
                              const isChildActive =
                                Number(selectedCategory) === child.id;
                              return (
                                <div
                                  key={cIdx}
                                  onClick={() =>
                                    setSelectedCategory(
                                      isChildActive ? null : child.id,
                                    )
                                  }
                                  className={cn(
                                    'flex items-center py-2.5 px-3 rounded-xl cursor-pointer transition-all duration-200 group/child',
                                    isChildActive
                                      ? 'bg-black/90 text-white shadow-md'
                                      : 'hover:bg-black/5',
                                  )}
                                >
                                  <p
                                    className={cn(
                                      'text-[13px] font-medium transition-colors',
                                      isChildActive
                                        ? 'text-white'
                                        : 'text-gray-600 group-hover/child:text-black',
                                    )}
                                  >
                                    {child.name}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              <div className="w-full pt-2">
                <button
                  onClick={() => setIsAll(!isAll)}
                  className="text-center w-full flex items-center justify-center py-3 cursor-pointer hover:bg-black/5 rounded-xl transition-colors border border-dashed border-gray-300"
                >
                  {isAll ? (
                    <ArrowUp size={18} className="text-gray-400" />
                  ) : (
                    <ArrowDown size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-10">
              <HorizontalLine />
              <div className="py-7">
                <h1 className="font-bold mb-6 uppercase tracking-widest text-xs text-gray-500">
                  Narx
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 ml-1">
                      Min
                    </p>
                    <Input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="h-10 text-sm font-bold bg-white/50"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 ml-1">
                      Max
                    </p>
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
                <h1 className="font-bold mb-6 uppercase tracking-widest text-xs text-gray-500">
                  Ranglar
                </h1>
                <div className="flex flex-wrap gap-3">
                  {colors?.map((color, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setSelectedColor(
                          selectedColor === color.id ? null : color.id,
                        )
                      }
                      style={{ backgroundColor: color.name }}
                      className={cn(
                        'w-9 h-9 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:scale-115 transition-all ring-offset-2 flex items-center justify-center',
                        selectedColor === color.id
                          ? 'ring-2 ring-black'
                          : 'hover:ring-2 hover:ring-black/20',
                        color.name === '#FFFFFF'
                          ? 'border-gray-200'
                          : 'border-transparent',
                      )}
                    >
                      {selectedColor === color.id && (
                        <Check
                          size={16}
                          className={cn(
                            color.name === '#FFFFFF' || color.name === '#F5DD06'
                              ? 'text-black'
                              : 'text-white',
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <HorizontalLine />
              <div className="py-7">
                <h1 className="font-bold mb-6 uppercase tracking-widest text-xs text-gray-500">
                  O'lchamlar
                </h1>
                <div className="flex flex-wrap gap-2.5">
                  {sizes?.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => toggleSize(size.id)}
                      className={cn(
                        'px-5 py-2.5 rounded-full text-xs font-semibold transition-all border cursor-pointer',
                        selectedSizes.includes(size.id)
                          ? 'bg-black text-white border-black'
                          : 'bg-[#F0F0F0] text-gray-600 border-transparent hover:border-black',
                      )}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={handleApplyFilters}
              className="w-full mt-6 rounded-full py-7 font-bold text-base shadow-xl hover:shadow-2xl transition-all"
            >
              Filterlarni qo'llash
            </Button>
          </div>
        </aside>

        <main id="main-content" className="flex-1 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              {searchParam ? (
                <>
                  <span>"{searchParam}"</span> bo'yicha qidiruv
                </>
              ) : (
                categories?.find(
                  (item: any) => item.id === Number(selectedCategory),
                )?.name || 'Barcha maxsulotlar'
              )}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors bg-white/50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                    <p>
                      Saralash:{' '}
                      <span className="font-bold text-black">
                        {sortBy === 'price'
                          ? sortOrder === 'asc'
                            ? 'Eng arzon'
                            : 'Eng qimmat'
                          : 'Eng yangi'}
                      </span>
                    </p>
                    <ArrowDown size={14} className="mt-0.5" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white rounded-xl shadow-xl border-gray-100 p-2 min-w-[180px]">
                  <DropdownMenuItem
                    onClick={() => {
                      setSortBy('createdAt');
                      setSortOrder('desc');
                    }}
                    className="cursor-pointer py-2.5 px-3 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    Eng yangi
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSortBy('price');
                      setSortOrder('asc');
                    }}
                    className="cursor-pointer py-2.5 px-3 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    Eng arzon
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSortBy('price');
                      setSortOrder('desc');
                    }}
                    className="cursor-pointer py-2.5 px-3 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    Eng qimmat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {productsLoading ? (
              <div className="col-span-full py-20 text-center text-gray-400">
                Loading products...
              </div>
            ) : productsData?.data.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400">
                No products found for the selected filters.
              </div>
            ) : (
              productsData?.data.map((item: any) => (
                <Product key={item.id} product={item} />
              ))
            )}
          </div>

          <div className="mt-12">
            <HorizontalLine />
          </div>

          {openPagination && (
            <div className="flex flex-col sm:flex-row items-center justify-between py-12 gap-6">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-8 py-6 rounded-xl font-bold text-sm"
              >
                Oldingi
              </Button>
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 sm:pb-0">
                {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      typeof page === 'number' && setCurrentPage(page)
                    }
                    className={cn(
                      'min-w-11 h-11 rounded-xl text-sm font-bold transition-all cursor-pointer',
                      currentPage === page
                        ? 'bg-black text-white shadow-lg scale-105'
                        : 'hover:bg-gray-100 text-gray-500 hover:text-black',
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                disabled={currentPage === 10}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 10))}
                className="px-8 py-6 rounded-xl font-bold text-sm"
              >
                Keyingi
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
