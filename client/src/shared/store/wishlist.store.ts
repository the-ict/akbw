import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IProduct } from '@/shared/config/api/product/product.model';

interface WishlistStore {
  items: IProduct[];
  toggleWishlist: (product: IProduct) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        const items = get().items;
        const exists = items.find((item) => item.id === product.id);

        if (exists) {
          set({ items: items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
