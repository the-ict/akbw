import Link from 'next/link';
import Image from 'next/image';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  slug: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/shop/${product.slug}`} className="group product-card block">
      <div className="relative aspect-[3/4] bg-akbw-sand/20 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-akbw-black text-akbw-white text-xs font-medium px-3 py-1 rounded">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="bg-akbw-olive text-akbw-white text-xs font-medium px-3 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-akbw-gray uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-base font-medium text-akbw-black mb-2 group-hover:text-akbw-olive transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-akbw-black">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-akbw-gray line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
