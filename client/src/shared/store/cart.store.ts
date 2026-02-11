import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { IProduct } from '@/shared/config/api/product/product.model'

interface CartItem extends IProduct {
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: IProduct, quantity?: number, size?: string, color?: string) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1, size, color) => {
                const items = get().items;
                const existingItem = items.find(item => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    });
                } else {
                    set({
                        items: [...items, { ...product, quantity, selectedSize: size, selectedColor: color }]
                    });
                }
            },
            removeItem: (productId) => {
                set({
                    items: get().items.filter(item => item.id !== productId)
                });
            },
            updateQuantity: (productId, quantity) => {
                set({
                    items: get().items.map(item =>
                        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
                    )
                });
            },
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
