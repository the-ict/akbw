import {
    Star
} from "lucide-react";
import Image from "next/image";
import {
    IProduct
} from "@/shared/config/api/product/product.model";

interface ProductProps {
    product?: IProduct;
}

export default function Product({ product }: ProductProps) {
    if (!product) {
        return null;
    }

    const firstImage = product.product_images?.[0] || '/assets/product.png';
    const discountPrice = product.price * 0.8;

    return (
        <div className="cursor-pointer flex flex-col gap-3 group" onClick={() => {
            window.location.replace(`/product/${product.id}`);
        }}>
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F0EEED]">
                <Image
                    src={firstImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <h1 className="text-lg font-semibold line-clamp-1">{product.name}</h1>
            <div className="flex items-center gap-2">
                {
                    [1, 2, 3, 4, 5].map((item, index) => (
                        <Star key={index} className="text-yellow-500 text-sm" size={15} fill="yellow" />
                    ))
                }
                <p className="text-sm text-gray-500">({product.rating}/5)</p>
            </div>
            <p className="text-lg font-semibold flex items-center gap-4">
                {product.price.toLocaleString()} so'm
                {product.discount > 0 && (
                    <>
                        <span className="text-sm text-gray-500 line-through">{discountPrice.toLocaleString()} so'm</span>
                        <span className="bg-red-500/30 px-3 py-1 rounded-full text-red-500 text-sm">-{product.discount}%</span>
                    </>
                )}
            </p>
        </div>
    )
}