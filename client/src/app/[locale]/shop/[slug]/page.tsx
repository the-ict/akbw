'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingCart, Heart, Truck, RefreshCw, ChevronLeft } from 'lucide-react';
import { ProductCard, Product } from '@/shared/ui/product-card';

// Mock product data - replace with API
const getProductBySlug = (slug: string) => {
  // In real app, fetch from API
  return {
    id: '1',
    name: 'Premium Cotton Tee',
    price: 45.00,
    originalPrice: 60.00,
    description: 'A timeless essential crafted from premium cotton. This tee features a relaxed fit, perfect for everyday wear. The minimalist design embodies quiet luxury and modern style.',
    images: [
      '/products/tee-1.jpg',
      '/products/tee-2.jpg',
      '/products/tee-3.jpg',
    ],
    category: 'Essentials',
    slug: 'premium-cotton-tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Sand'],
    details: [
      '100% Premium Cotton',
      'Relaxed fit',
      'Heavyweight fabric (220gsm)',
      'Pre-shrunk',
      'Machine washable',
    ],
    isNew: true,
    inStock: true,
  };
};

// Mock related products
const relatedProducts: Product[] = [
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
    id: '5',
    name: 'Relaxed Fit Shirt',
    price: 55.00,
    image: '/products/shirt-1.jpg',
    category: 'Essentials',
    slug: 'relaxed-fit-shirt',
  },
  {
    id: '8',
    name: 'Basic Crewneck',
    price: 40.00,
    image: '/products/crewneck-1.jpg',
    category: 'Essentials',
    slug: 'basic-crewneck',
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
];

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Add to cart logic here
    console.log('Added to cart:', { product, selectedSize, selectedColor, quantity });
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-akbw-white py-4">
        <div className="container">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm text-akbw-gray hover:text-akbw-black transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-akbw-white rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2 text-akbw-gray">
                    <div className="font-display text-4xl">AKBW</div>
                    <p className="text-sm">Product Image {selectedImage + 1}</p>
                  </div>
                </div>
                
                {/* Badges */}
                {product.isNew && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-akbw-black text-akbw-white text-xs font-medium px-3 py-1 rounded">
                      New
                    </span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-akbw-olive text-akbw-white text-xs font-medium px-3 py-1 rounded">
                      -{discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-[3/4] bg-akbw-white rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'ring-2 ring-akbw-black'
                        : 'hover:ring-2 hover:ring-akbw-gray'
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-akbw-gray text-xs">
                      Image {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <p className="text-sm text-akbw-gray uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="font-display text-3xl md:text-4xl text-akbw-black mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold text-akbw-black">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-akbw-gray line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-akbw-gray leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <div>
                <label className="block text-sm font-medium text-akbw-black mb-3">
                  Color: <span className="font-normal text-akbw-gray">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'border-akbw-black bg-akbw-black text-akbw-white'
                          : 'border-black/10 text-akbw-black hover:border-akbw-gray'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-sm font-medium text-akbw-black mb-3">
                  Size: {selectedSize && <span className="font-normal text-akbw-gray">{selectedSize}</span>}
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-akbw-black bg-akbw-black text-akbw-white'
                          : 'border-black/10 text-akbw-black hover:border-akbw-gray'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-akbw-black mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-black/10 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-akbw-sand/20 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-akbw-sand/20 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isFavorite
                        ? 'border-akbw-black bg-akbw-black text-akbw-white'
                        : 'border-black/10 hover:border-akbw-gray'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-akbw-black text-akbw-white py-4 rounded-lg font-medium hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-black/10">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-akbw-gray" />
                  <span className="text-sm text-akbw-gray">Free shipping over $100</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-akbw-gray" />
                  <span className="text-sm text-akbw-gray">30-day returns</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="pt-6 border-t border-black/10">
                <h3 className="font-display text-sm mb-3">Product Details</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-sm text-akbw-gray flex items-start">
                      <span className="mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-padding bg-akbw-white">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl text-akbw-black mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
