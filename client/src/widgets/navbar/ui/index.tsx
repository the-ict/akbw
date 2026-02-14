'use client';

import { Button } from '@/shared/ui/button';
import { Link, useRouter } from '@/shared/config/i18n/navigation';
import { useUserStore } from '@/shared/store/user.store';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/shared/ui/dropdown-menu';
import Register from '@/widgets/register';
import Profile from '@/widgets/profile';
import Login from '@/widgets/login';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import { useCategories } from '../lib/hooks';

const Navbar = () => {
  const [activeParentId, setActiveParentId] = useState<number | null>(null);

  const [searchVal, setSearchVal] = useState<string>('');
  const { token } = useUserStore();
  const [isChildren, setIsChildren] = useState<boolean>(false);
  const router = useRouter();

  const { data: categories, isLoading } = useCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/filters?q=${searchVal.trim()}`);
    }
  };

  if (isLoading) return null;
  return (
    <nav className="bg-[#D6D3CC] py-5 sticky top-0 z-50">
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={'/'}>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              AKBW
            </h1>
          </Link>
        </div>

        <ul className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none group/trigger">
              <li className="flex items-center gap-1 cursor-pointer font-bold transition-all hover:text-black/70">
                <span className="text-sm uppercase tracking-wider">
                  Kategoriya
                </span>
                <ArrowDown
                  size={14}
                  className="group-data-[state=open]/trigger:rotate-180 transition-transform duration-300"
                />
              </li>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-2 bg-[#D6D3CC]/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[24px] w-[320px] mt-4 animate-in fade-in zoom-in-95 duration-200 z-[70]">
              <div className="overflow-hidden relative">
                {!isChildren && (
                  <div className="flex flex-col gap-1 p-2 animate-in slide-in-from-left-4 duration-300">
                    <p className="px-3 py-2 text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">
                      Kategoriyalar
                    </p>
                    {categories
                      ?.filter((c) => !c.parentId)
                      .map((category) => (
                        <div
                          key={category.id}
                          onClick={() => {
                            if (
                              category.children &&
                              category.children.length > 0
                            ) {
                              setActiveParentId(category.id);
                              setIsChildren(true);
                            } else {
                              router.push(`/filters?category=${category.id}`);
                            }
                          }}
                          className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/50 cursor-pointer transition-all"
                        >
                          <span className="font-bold text-sm uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                            {category.name}
                          </span>
                          {category.children &&
                            category.children.length > 0 && (
                              <ChevronRight
                                size={16}
                                className="text-gray-400 group-hover:text-black transition-colors"
                              />
                            )}
                        </div>
                      ))}
                    <div className="h-px bg-black/5 my-2 mx-2" />
                    <Link
                      href="/filters"
                      className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-black hover:text-white cursor-pointer transition-all"
                    >
                      <span className="font-bold text-xs uppercase tracking-widest">
                        Barchasini ko'rish
                      </span>
                      <ArrowDown
                        size={16}
                        className="-rotate-90 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </div>
                )}

                {isChildren && activeParentId && (
                  <div className="flex flex-col gap-1 p-2 animate-in slide-in-from-right-4 duration-300">
                    <div
                      onClick={() => setIsChildren(false)}
                      className="flex items-center gap-2 px-2 py-3 mb-2 cursor-pointer text-gray-500 hover:text-black transition-colors"
                    >
                      <ChevronLeft size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Ortga
                      </span>
                    </div>

                    <div className="px-4 mb-3">
                      <h3 className="font-black text-lg uppercase tracking-tight">
                        {categories?.find((c) => c.id === activeParentId)?.name}
                      </h3>
                    </div>

                    {categories
                      ?.find((c) => c.id === activeParentId)
                      ?.children?.map((child) => (
                        <Link
                          key={child.id}
                          href={`/filters?category=${child.id}`}
                          className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/50 cursor-pointer transition-all"
                        >
                          <span className="font-medium text-sm text-gray-700 group-hover:text-black group-hover:translate-x-1 transition-all">
                            {child.name}
                          </span>
                        </Link>
                      ))}

                    <div className="h-px bg-black/5 my-2 mx-2" />

                    <Link
                      href={`/filters?category=${activeParentId}`}
                      className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-black hover:text-white cursor-pointer transition-all"
                    >
                      <span className="font-bold text-xs uppercase tracking-widest">
                        Kategoriya bo'yicha barchasi
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-4 bg-black/10 mx-2" />

          <Link
            href={'/about'}
            className="text-sm uppercase tracking-wider text-gray-600 hover:text-black transition-all font-bold"
          >
            Biz haqimizda
          </Link>
          <Link
            href={'/contact'}
            className="text-sm uppercase tracking-wider text-gray-600 hover:text-black transition-all font-bold"
          >
            Bog'lanish
          </Link>
        </ul>

        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full border-1 border-[#000]/20 shadow-sm bg-[#fff] flex-1 max-w-md"
        >
          <button type="submit">
            <Search size={20} />
          </button>
          <input
            type="text"
            placeholder="Maxsulotlarni qidiring"
            className="bg-transparent outline-none flex-1 text-sm"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-3">
          <Link href={'/search'} className="lg:hidden p-1">
            <Search size={24} />
          </Link>
          <Link href={'/cart'} className="p-1 cursor-pointer">
            <ShoppingCart size={24} />
          </Link>

          <select className="hidden md:block bg-transparent text-sm outline-none cursor-pointer">
            <option value="english">English 🇺🇸</option>
            <option value="russian">Russian 🇷🇺</option>
            <option value="uzbek">Uzbek 🇺🇿</option>
          </select>

          {token === null ? (
            <>
              <div className="hidden lg:flex items-center gap-2">
                <Login />
                <Register />
              </div>
              <div className="lg:hidden">
                <Profile>
                  <User size={24} className="cursor-pointer" />
                </Profile>
              </div>
            </>
          ) : (
            <Profile>
              <User
                size={24}
                className="cursor-pointer hover:opacity-70 transition-opacity"
              />
            </Profile>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
