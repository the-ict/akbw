import { IProduct } from '@/shared/config/api/product/product.model';
import { useWishlistStore } from '@/shared/store/wishlist.store';
import { useCartStore } from '@/shared/store/cart.store';
import { Button } from '@/shared/ui/button';
import { toast } from '@/shared/ui/toast';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function FavoriteTab() {
  const { items, toggleWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-20 bg-[#D6D3CC]/10 rounded-3xl border border-dashed border-[#D6D3CC]">
          <Heart size={48} className="mx-auto mb-4 text-[#D6D3CC]" />
          <p className="text-gray-500 font-medium tracking-tight">
            Sevimli mahsulotlar yo'q
          </p>
        </div>
      ) : (
        items.map((item: IProduct) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 group"
          >
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F0EEED] flex-shrink-0">
              <Image
                src={item.product_images?.[0] || '/assets/product.png'}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-base truncate">{item.name}</h4>
              <p className="text-lg font-black mt-0.5">
                {item.price.toLocaleString()} so'm
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  addItem(item);
                  toast.success(`${item.name} savatga qo'shildi`);
                }}
                size="sm"
                className="rounded-full cursor-pointer px-5 py-5 font-bold text-xs shadow-lg shadow-black/5"
              >
                Savatga
              </Button>
              <button
                onClick={() => toggleWishlist(item)}
                className="p-2.5 cursor-pointer text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Heart size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
