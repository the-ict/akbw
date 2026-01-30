'use client';

import Link from 'next/link';
import { ArrowRight, Truck, RefreshCw, Shield } from 'lucide-react';
import { ProductCard, Product } from '@/shared/ui/product-card';

// Mock data - replace with actual API data
const featuredProducts: Product[] = [
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
];

export default function Welcome() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-akbw-white section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-akbw-black leading-tight">
                  Quiet Luxury
                  <br />
                  Modern Style
                </h1>
                <p className="text-lg text-akbw-gray max-w-lg">
                  Premium minimal streetwear designed for those who value quality, confidence, and timeless style.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center bg-akbw-black text-akbw-white px-8 py-4 rounded-lg font-medium hover:opacity-85 transition-opacity"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center border-2 border-akbw-black text-akbw-black px-8 py-4 rounded-lg font-medium hover:bg-akbw-black hover:text-akbw-white transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-square lg:aspect-[4/5] bg-akbw-sand/30 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-akbw-gray">
                {/* Placeholder for hero image */}
                <div className="text-center space-y-2">
                  <div className="font-display text-6xl">AKBW</div>
                  <p className="text-sm">Hero Image Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding">
        <div className="container">
          {/* Section Header */}
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="font-display text-3xl md:text-4xl text-akbw-black">
                New Arrivals
              </h2>
              <p className="text-akbw-gray">Fresh styles for the season</p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center text-akbw-black hover:text-akbw-olive transition-colors font-medium"
            >
              View All
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Mobile View All */}
          <div className="sm:hidden text-center">
            <Link
              href="/shop"
              className="inline-flex items-center text-akbw-black hover:text-akbw-olive transition-colors font-medium"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-akbw-white section-padding">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-akbw-black rounded-full">
                <Truck className="w-8 h-8 text-akbw-white" />
              </div>
              <h3 className="font-display text-lg">Free Shipping</h3>
              <p className="text-sm text-akbw-gray">
                On orders over $100
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-akbw-black rounded-full">
                <RefreshCw className="w-8 h-8 text-akbw-white" />
              </div>
              <h3 className="font-display text-lg">Easy Returns</h3>
              <p className="text-sm text-akbw-gray">
                30-day return policy
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-akbw-black rounded-full">
                <Shield className="w-8 h-8 text-akbw-white" />
              </div>
              <h3 className="font-display text-lg">Secure Payment</h3>
              <p className="text-sm text-akbw-gray">
                100% secure transactions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div className="bg-akbw-black text-akbw-white rounded-2xl p-12 md:p-20 text-center">
            <h2 className="font-display text-3xl md:text-5xl mb-4">
              Discover Your Style
            </h2>
            <p className="text-akbw-gray text-lg mb-8 max-w-2xl mx-auto">
              Explore our complete collection of premium streetwear designed for the modern wardrobe
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-akbw-white text-akbw-black px-8 py-4 rounded-lg font-medium hover:opacity-85 transition-opacity"
            >
              Browse Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
