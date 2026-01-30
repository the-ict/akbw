'use client';

import { Button } from "@/shared/ui/button";
import { ArrowDown, Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-[#D6D3CC] py-5">
      <div className="container flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold flex-1">AKBW</h1>
        <ul className="flex items-center gap-5 flex-3">
          <li className="flex items-center gap-1 cursor-pointer">
            <span>Shop</span>
            <ArrowDown size={16} />
          </li>
          <li className="cursor-pointer">
            On Sale
          </li>
          <li className="cursor-pointer">
            New Arrivals
          </li>
          <li className="cursor-pointer">
            Brands
          </li>
        </ul>
        <form className="flex flex-3 items-center gap-2 px-3 py-2 rounded-full  border-1 border-[#000]/20 shadow-sm bg-[#fff]">
          <button>
            <Search size={20} />
          </button>
          <input type="text" placeholder="Search for products" className="bg-transparent outline-none flex-1" />
        </form>

        <div className="flex items-center gap-3 flex-2 ml-6">
          <button>
            <ShoppingCart size={20} />
          </button>

          <select>
            <option value="english">English 🇺🇸</option>
            <option value="uzbek">Uzbek 🇺🇿</option>
            <option value="russian">Russian 🇷🇺</option>
          </select>

          <div className="flex items-center gap-2">
            <Button variant={"outline"} className="btn-sign-in-padding">
              Sign In
            </Button>

            <Button className="bg-[#fff]/50 text-[#000] btn-register-padding hover:bg-[#fff]/80 border-1 border-[#000]/20  shadow-xl">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
