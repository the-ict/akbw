import { Input } from "@/shared/ui/input";
import { ShoppingCart } from "lucide-react";
import { NavbarItems } from "../lib/data";

const Navbar = () => {
  return (
    <div className="custom-container py-5 flex items-center gap-5">
      <h1 className="kenao-font text-3xl">AKBW</h1>
      <ul className="flex items-center gap-5 ml-10">
        {
          NavbarItems.map((item, _) => {
            return (
              <li key={_} className="cursor-pointer">{item.label}</li>
            )
          })
        }
      </ul>
      <Input placeholder="Maxsulot qidirish..." />
      <ShoppingCart />
      <button>Kirish / Ro'yhatdan o'tish</button>
    </div>
  );
};

export default Navbar;
