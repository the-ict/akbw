import ProductImage from "../../../public/assets/product.png";
import {
    Star
} from "lucide-react";
import Image from "next/image";

export default function Product() {
    return (
        <div className="cursor-pointer flex flex-col gap-3 group">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F0EEED]">
                <Image
                    src={ProductImage.src}
                    alt="product"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <h1 className="text-lg font-semibold">T-shirt with Tape Details</h1>
            <div className="flex items-center gap-2">
                {
                    [1, 2, 3, 4, 5].map((item, index) => (
                        <Star key={index} className="text-yellow-500 text-sm" size={15} fill="yellow" />
                    ))
                }
                <p className="text-sm text-gray-500">(123)</p>
            </div>
            <p className="text-lg font-semibold flex items-center gap-4">$240 <span className="text-sm text-gray-500">$240</span> <span className="bg-red-500/30 px-3 py-1 rounded-full text-red-500 text-sm">-20%</span></p>
        </div>
    )
}