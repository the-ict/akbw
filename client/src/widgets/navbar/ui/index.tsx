import { SearchIcon, ShoppingCart } from "lucide-react";
import { NavbarItems } from "../lib/data";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

const Navbar = () => {
  return (
    <header className="flex items-center custom-container justify-between py-4  bg-white">
      <Link href="/">
        <h1 className="kenao-font text-2xl font-bold cursor-pointer">AKBW</h1>
      </Link>

      <div className="flex items-center gap-6">
        <ul className="hidden md:flex items-center gap-6">
          {NavbarItems.map((item, index) => (
            <li
              key={index}
              className=" text-gray-700 cursor-pointer hover:text-black transition-colors"
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 w-64">
          <SearchIcon size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Qidirish..."
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ShoppingCart className="text-gray-700 cursor-pointer hover:text-black transition-colors" />
        <Button size="sm" variant="outline">
          Kirish
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
