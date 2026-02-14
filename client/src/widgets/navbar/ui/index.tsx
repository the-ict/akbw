'use client';

import {
  Button
} from "@/shared/ui/button";
import {
  Link,
  useRouter
} from "@/shared/config/i18n/navigation";
import {
  useUserStore
} from "@/shared/store/user.store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/shared/ui/dropdown-menu";
import Register from "@/widgets/register";
import Profile from "@/widgets/profile";
import Login from "@/widgets/login";
import {
  useState
} from "react";
import {
  cn
} from "@/shared/lib/utils";
import {
  ArrowDown,
  Menu,
  Search,
  ShoppingCart,
  User,
  X
} from "lucide-react";
import {
  useCategories
} from "../lib/hooks";


const Navbar = () => {
  const [activeParentId, setActiveParentId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<string>('');
  const { token } = useUserStore();
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
          <Link href={"/"}>
            <h1 className="font-display text-2xl md:text-3xl font-bold">AKBW</h1>
          </Link>
        </div>

        <ul className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none group/trigger">
              <li className="flex items-center gap-1 cursor-pointer transition-all hover:text-black/70">
                <span className="text-sm uppercase tracking-wider">Kategoriya</span>
                <ArrowDown size={14} className="group-data-[state=open]/trigger:rotate-180 transition-transform duration-300" />
              </li>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-6 bg-white/95 backdrop-blur-2xl border-none shadow-2xl rounded-[32px] w-[800px] mt-4 animate-in fade-in zoom-in-95 duration-300 z-[70]">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 border-b border-black/5">
                  {categories?.filter(c => !c.parentId).map((item, index) => {
                    const isActive = activeParentId === item.id;
                    return (
                      <div
                        key={index}
                        onMouseEnter={() => setActiveParentId(item.id)}
                        onClick={() => {
                          if (!item.children || item.children.length === 0) {
                            router.push(`/filters?category=${item.id}`);
                          }
                        }}
                        className={cn(
                          "px-6 py-3 rounded-2xl cursor-pointer transition-all whitespace-nowrap text-sm font-bold uppercase tracking-widest",
                          isActive ? "bg-black text-white shadow-xl shadow-black/10 scale-105" : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-black"
                        )}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>

                <div className="min-h-[150px]">
                  {activeParentId ? (
                    <div className="grid grid-cols-4 gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
                      {categories?.find(c => c.id === activeParentId)?.children?.map((child, cIdx) => (
                        <Link
                          key={cIdx}
                          href={`/filters?category=${child.id}`}
                          className="group/item flex flex-col gap-2 p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-black/5"
                        >
                          <span className="text-sm font-bold text-gray-800 group-hover/item:text-black transition-colors">{child.name}</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black opacity-0 group-hover/item:opacity-100 transition-opacity">Ko'rish →</span>
                        </Link>
                      ))}
                      {(!categories?.find(c => c.id === activeParentId)?.children || categories?.find(c => c.id === activeParentId)?.children?.length === 0) && (
                        <div className="col-span-4 flex items-center justify-center py-10 text-gray-300 font-bold uppercase tracking-widest text-sm">
                          Bu kategoriya uchun qismlar yo'q
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-10 text-gray-300 font-bold uppercase tracking-widest text-sm">
                      Kategoriyani tanlang
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t border-black/5">
                  <Link
                    href={activeParentId ? `/filters?category=${activeParentId}` : '/filters'}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-black hover:opacity-70 transition-opacity"
                  >
                    Barcha mahsulotlarni ko'rish
                  </Link>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-4 bg-black/10 mx-2" />

          <Link href={"/about"} className="text-sm uppercase tracking-wider text-gray-600 hover:text-black transition-all">Biz haqimizda</Link>
          <Link href={"/contact"} className="text-sm uppercase tracking-wider text-gray-600 hover:text-black transition-all">Bog'lanish</Link>
        </ul>

        <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full border-1 border-[#000]/20 shadow-sm bg-[#fff] flex-1 max-w-md">
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
          <Link href={"/cart"} className="p-1 cursor-pointer">
            <ShoppingCart size={24} />
          </Link >

          <select className="hidden md:block bg-transparent text-sm outline-none cursor-pointer">
            <option value="english">English 🇺🇸</option>
            <option value="russian">Russian 🇷🇺</option>
            <option value="uzbek">Uzbek 🇺🇿</option>
          </select>

          {
            token === null ? (
              <div className="hidden sm:flex items-center gap-2">
                <Login />
                <Register />
              </div>
            ) : (
              <Profile>
                <User size={24} className="cursor-pointer hover:opacity-70 transition-opacity" />
              </Profile>
            )
          }
        </div>
      </div>

      <div className={cn(
        "fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsMenuOpen(false)}>
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-[80%] max-w-xs bg-white p-6 shadow-2xl transition-transform duration-300 transform",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-2xl font-bold text-black border-b border-black pb-2">AKBW MENYU</h1>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-black/10 shadow-sm bg-gray-50 mb-8">
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
            {categories?.filter(c => !c.parentId).map((item, index) => {
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
                    <span className="uppercase tracking-tight">{item.name}</span>
                    {hasChildren && (
                      <ArrowDown
                        size={20}
                        className={cn("transition-transform duration-300", isActive ? "rotate-180" : "")}
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
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>Haqimizda</Link>
            </li>
            <li className="border-b border-black/5 pb-2">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Bog'lanish</Link>
            </li>
          </ul>

          <div className="mt-10 flex flex-col gap-4">
            <Button variant={"outline"} className="w-full justify-center text-lg font-bold py-6 rounded-xl">
              Sign In
            </Button>
            <Button className="w-full justify-center bg-black text-white hover:bg-black/90 text-lg font-bold py-6 rounded-xl shadow-lg">
              Sign Up
            </Button>
          </div>

          <div className="mt-auto absolute bottom-10 left-6 right-6">
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