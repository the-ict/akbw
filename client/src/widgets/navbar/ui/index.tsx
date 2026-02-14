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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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
          <button
            className="lg:hidden p-1 hover:bg-black/5 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
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
                {/* Parent Categories View */}
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

                {/* Child Categories View */}
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
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-1">
            <Search size={24} />
          </button>
          <Link href={'/cart'} className="p-1 cursor-pointer">
            <ShoppingCart size={24} />
          </Link>

          <select className="hidden md:block bg-transparent text-sm outline-none cursor-pointer">
            <option value="english">English 🇺🇸</option>
            <option value="russian">Russian 🇷🇺</option>
            <option value="uzbek">Uzbek 🇺🇿</option>
          </select>

          {token === null ? (
            <div className="hidden sm:flex items-center gap-2">
              <Login />
              <Register />
            </div>
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

      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden',
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={cn(
            'fixed inset-y-0 left-0 w-[80%] max-w-xs bg-white p-6 shadow-2xl transition-transform duration-300 transform overflow-y-auto flex flex-col',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-2xl font-bold text-black border-b border-black pb-2">
              AKBW MENYU
            </h1>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-black/10 shadow-sm bg-gray-50 mb-8"
          >
            <button type="submit">
              <Search size={20} className="text-gray-400" />
            </button>
            <input
              type="text"
              placeholder="Maxsulotlarni qidiring"
              className="bg-transparent outline-none flex-1 text-sm font-medium"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </form>

          <ul className="flex flex-col gap-6 text-lg font-bold">
            {categories
              ?.filter((c) => !c.parentId)
              .map((item, index) => {
                const isActive = activeParentId === item.id;
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <li key={index} className="border-b border-black/5 pb-4">
                    <div
                      onClick={() => {
                        if (hasChildren) {
                          setActiveParentId(isActive ? null : item.id);
                        } else {
                          router.push(`/filters?category=${item.id}`);
                          setIsMenuOpen(false);
                        }
                      }}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span className="uppercase tracking-tight">
                        {item.name}
                      </span>
                      {hasChildren && (
                        <ArrowDown
                          size={20}
                          className={cn(
                            'transition-transform duration-300',
                            isActive ? 'rotate-180' : '',
                          )}
                        />
                      )}
                    </div>
                    {hasChildren && isActive && (
                      <div className="mt-4 ml-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
                        <Link
                          href={`/filters?category=${item.id}`}
                          className="text-gray-400 text-sm uppercase font-black"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Barchasini ko'rish
                        </Link>
                        {item.children?.map((child, cIdx) => (
                          <Link
                            key={cIdx}
                            href={`/filters?category=${child.id}`}
                            className="text-black/80 text-base"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            <li className="border-b border-black/5 pb-2">
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                Haqimizda
              </Link>
            </li>
            <li className="border-b border-black/5 pb-2">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Bog'lanish
              </Link>
            </li>
          </ul>

          <div className="mt-10 flex flex-col gap-4">
            <Login
              trigger={
                <Button
                  variant={'outline'}
                  className="w-full justify-center text-lg font-bold py-6 rounded-xl"
                >
                  Sign In
                </Button>
              }
            />
            <Register
              trigger={
                <Button className="w-full justify-center bg-black text-white hover:bg-black/90 text-lg font-bold py-6 rounded-xl shadow-lg">
                  Sign Up
                </Button>
              }
            />
          </div>

          <div className="mt-auto w-full pt-10">
            <select className="w-full p-2 rounded-lg border border-black/10 text-sm">
              <option value="english">English 🇺🇸</option>
              <option value="uzbek">Uzbek 🇺🇿</option>
              <option value="russian">Russian 🇷🇺</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
