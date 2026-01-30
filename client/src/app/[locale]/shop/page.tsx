'use client';

import { useState } from 'react';
import { ProductCard, Product } from '@/shared/ui/product-card';
import { Filter, X } from 'lucide-react';

// Mock products data - replace with API
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton Tee',
    price: 45.00,
    originalPrice: 60.00,
    image: '/products/tee-1.jpg',
    category: 'Essentials',
    slug: 'premium-cotton-tee',
    isNew: true,
  },
  {
    id: '2',
    name: 'Minimalist Hoodie',
    price: 89.00,
    image: '/products/hoodie-1.jpg',
    category: 'Outerwear',
    slug: 'minimalist-hoodie',
    isNew: true,
  },
  {
    id: '3',
    name: 'Classic Joggers',
    price: 65.00,
    originalPrice: 85.00,
    image: '/products/jogger-1.jpg',
    category: 'Bottoms',
    slug: 'classic-joggers',
  },
  {
    id: '4',
    name: 'Oversized Jacket',
    price: 120.00,
    image: '/products/jacket-1.jpg',
    category: 'Outerwear',
    slug: 'oversized-jacket',
  },
  {
    id: '5',
    name: 'Relaxed Fit Shirt',
    price: 55.00,
    image: '/products/shirt-1.jpg',
    category: 'Essentials',
    slug: 'relaxed-fit-shirt',
  },
  {
    id: '6',
    name: 'Cargo Pants',
    price: 75.00,
    originalPrice: 95.00,
    image: '/products/pants-1.jpg',
    category: 'Bottoms',
    slug: 'cargo-pants',
  },
  {
    id: '7',
    name: 'Lightweight Vest',
    price: 95.00,
    image: '/products/vest-1.jpg',
    category: 'Outerwear',
    slug: 'lightweight-vest',
    isNew: true,
  },
  {
    id: '8',
    name: 'Basic Crewneck',
    price: 40.00,
    image: '/products/crewneck-1.jpg',
    category: 'Essentials',
    slug: 'basic-crewneck',
  },
];

const categories = ['All', 'Essentials', 'Outerwear', 'Bottoms'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products
  const filteredProducts = allProducts.filter((product) =>
    selectedCategory === 'All' ? true : product.category === selectedCategory
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // newest (default order)
  });

  return (
    <div className="min-h-screen section-padding">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-akbw-black mb-4">
            Shop Collection
          </h1>
          <p className="text-akbw-gray text-lg">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="font-display text-sm mb-4">Category</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`text-sm transition-colors ${
                          selectedCategory === category
                            ? 'text-akbw-black font-medium'
                            : 'text-akbw-gray hover:text-akbw-black'
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-display text-sm mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-akbw-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-akbw-black"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 bg-akbw-black text-akbw-white px-6 py-3 rounded-full shadow-lg hover:opacity-85 transition-opacity"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Mobile Filters Modal */}
          {mobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileFiltersOpen(false)}>
              <div
                className="absolute right-0 top-0 bottom-0 w-80 bg-akbw-sand p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-display text-xl">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-akbw-black hover:text-akbw-gray"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Categories */}
                  <div>
                    <h3 className="font-display text-sm mb-4">Category</h3>
                    <ul className="space-y-3">
                      {categories.map((category) => (
                        <li key={category}>
                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setMobileFiltersOpen(false);
                            }}
                            className={`text-sm transition-colors ${
                              selectedCategory === category
                                ? 'text-akbw-black font-medium'
                                : 'text-akbw-gray hover:text-akbw-black'
                            }`}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sort */}
                  <div>
                    <h3 className="font-display text-sm mb-4">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setMobileFiltersOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-akbw-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-akbw-black"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-akbw-gray text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
