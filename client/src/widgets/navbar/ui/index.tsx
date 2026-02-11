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
  DropdownMenuItem,
} from "@/shared/ui/dropdown-menu";
import Register from "@/widgets/register";
import Login from "@/widgets/login";
import Profile from "@/widgets/profile";
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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { token } = useUserStore();
  const [searchVal, setSearchVal] = useState<string>('');
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

        <ul className="hidden lg:flex items-center gap-5 flex-1 justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <li className="flex items-center gap-1 cursor-pointer transition-all">
                <span>Kategoriya</span>
                <ArrowDown size={16} />
              </li>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="grid grid-cols-8 grid-rows-2 p-4 mt-10 ml-10 bg-[#D6D3CC]/60 backdrop-blur-md border-none items-center gap-3">
              {categories?.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link
                    href={`/filters?category=${item.id}`}
                    className="w-full justify-center cursor-pointer py-3 bg-[#fff]/40 backdrop-blur-sm hover:bg-[#fff] mt-2 rounded-lg shadow-sm text-center transition-all text-sm font-medium block"
                  >
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={"/about"} className="cursor-pointer transition-all">Biz haqimizda</Link>
          <Link href={"/contact"} className="cursor-pointer transition-all">Bog'lanish</Link>
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
            <option value="uzbek">Uzbek 🇺🇿</option>
            <option value="russian">Russian 🇷🇺</option>
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

      {/* Mobile Menu Overlay */}
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

          {/* Mobile Search */}
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
            <li className="flex items-center justify-between border-b border-black/5 pb-2">
              <span>Shop</span>
              <ArrowDown size={18} />
            </li>
            <li className="border-b border-black/5 pb-2">To'plamlar</li>
            <li className="border-b border-black/5 pb-2">Haqimizda</li>
            <li className="border-b border-black/5 pb-2">Bog'lanish</li>
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
