"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Minus, Plus, Check, MapPinCheckInside, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import { monsterrat } from '@/shared/fonts';
import ProductCard from '@/widgets/product';
import { useProduct } from '@/features/products/lib/hooks';
import { useProducts } from '@/features/products/lib/hooks';

interface ProductProps {
    id: string;
}

export default function Product({ id }: ProductProps) {
    const { data: product, isLoading, error } = useProduct(id);
    const { data: relatedProducts } = useProducts({ limit: 4 });
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState('reviews');

    // Set default selections when product loads
    React.useEffect(() => {
        if (product) {
            if (product.colors?.length > 0 && selectedColor === null) {
                setSelectedColor(product.colors[0].id);
            }
            if (product.sizes?.length > 0 && selectedSize === null) {
                setSelectedSize(product.sizes[0].id);
            }
        }
    }, [product, selectedColor, selectedSize]);

    if (isLoading) {
        return (
            <div className='min-h-screen bg-white flex items-center justify-center'>
                <div className='text-center'>
                    <div className='w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4' />
                    <p className='text-gray-500'>Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className='min-h-screen bg-white flex items-center justify-center'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold mb-2'>Product not found</h2>
                    <p className='text-gray-500'>The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const productImages = product.product_images?.length > 0 ? product.product_images : ['/assets/product.png'];

    const reviews = [
        { name: "Samantha D.", date: "August 14, 2023", text: "I absolutely love this t-shirt! The design is unique and the fabric feels so high quality. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.", verified: true, rating: 5 },
        { name: "Alex M.", date: "August 15, 2023", text: "The fit is perfect and the color is exactly as shown in the pictures. I've received so many compliments since I started wearing it. Highly recommend for anyone looking for style and comfort.", verified: true, rating: 5 },
        { name: "Ethan R.", date: "August 16, 2023", text: "Quality is top-notch. I've washed it a few times and the graphic still looks brand new. The material is very breathable, which is great for the current weather.", verified: true, rating: 4 },
        { name: "Olivia P.", date: "August 17, 2023", text: "Fast shipping and great customer service. The sizing is accurate, but I would suggest sizing up if you want a more oversized look. Definitely worth the price.", verified: true, rating: 5 },
        { name: "Liam K.", date: "August 18, 2023", text: "Been looking for a simple but stylish graphic tee for a while and this one hits the spot. The minimal design goes well with almost anything in my wardrobe.", verified: true, rating: 4 },
        { name: "Ava H.", date: "August 19, 2023", text: "Such a vibe! AKBW never misses with their graphic designs. I'm already eyeing my next purchase. Keep up the great work guys!", verified: true, rating: 5 }
    ];

    return (
        <div className='min-h-screen bg-white'>
            <div className='container py-10 px-4 md:px-6'>
                {/* Breadcrumbs */}
                <div className='flex gap-2 text-sm text-gray-500 mb-10'>
                    <span>Home</span>
                    <span>/</span>
                    <span>Shop</span>
                    <span>/</span>
                    <span className='text-black font-medium'>Men</span>
                    <span>/</span>
                    <span className='text-black font-medium'>T-shirts</span>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 mb-20'>
                    <div className='flex flex-col-reverse md:flex-row gap-5'>
                        <div className='flex md:flex-col gap-5 overflow-x-auto md:overflow-y-auto no-scrollbar'>
                            {productImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={cn(
                                        'relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shrink-0',
                                        activeImage === idx ? 'border-black shadow-lg scale-95' : 'border-transparent bg-gray-100 opacity-70 hover:opacity-100'
                                    )}
                                >
                                    <Image src={img} alt={`thumbnail-${idx}`} fill className='object-cover' />
                                </div>
                            ))}
                        </div>
                        <div className='relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-xl'>
                            <Image src={productImages[activeImage]} alt="product-main" fill className='object-cover transition-transform duration-700' />
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className={cn('text-4xl md:text-5xl lg:text-5.5xl font-black uppercase mb-4 leading-tight', monsterrat.className)}>
                            {product.name}
                        </h1>

                        <div className='flex items-center gap-3 mb-6'>
                            <div className='flex gap-1'>
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        size={18}
                                        className='text-yellow-400'
                                        fill='currentColor'
                                    />
                                ))}
                            </div>
                            <span className='text-sm font-medium'>
                                4.5/<span className='text-gray-400 font-normal'>5</span>
                            </span>
                        </div>

                        <div className='flex items-center gap-4 mb-8'>
                            <span className='text-3xl font-bold'>{product.price.toLocaleString()} so'm</span>
                        </div>

                        <p className='text-gray-500 leading-relaxed mb-10 text-lg max-w-xl'>
                            {product.description}
                        </p>

                        <hr className='border-gray-100 mb-8' />

                        <div className='mb-8'>
                            <h3 className='text-gray-500 font-medium mb-4 uppercase tracking-widest text-xs'>Select Colors</h3>
                            <div className='flex gap-4'>
                                {product.colors?.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        style={{ backgroundColor: color.name }}
                                        className={cn(
                                            'w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm border-2 cursor-pointer',
                                            selectedColor === color.id ? 'border-black ring-4 ring-black/5' : 'border-transparent'
                                        )}
                                    >
                                        {selectedColor === color.id && <Check size={18} className='text-white' />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <hr className='border-gray-100 mb-8' />

                        <div className='mb-10'>
                            <h3 className='text-gray-500 font-medium mb-4 uppercase tracking-widest text-xs'>Choose Size</h3>
                            <div className='flex flex-wrap gap-3'>
                                {product.sizes?.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setSelectedSize(size.id)}
                                        className={cn(
                                            'px-7 py-3 rounded-full text-sm font-semibold transition-all border cursor-pointer',
                                            selectedSize === size.id
                                                ? 'bg-black text-white border-black shadow-xl scale-105'
                                                : 'bg-gray-100 border-transparent text-gray-500 hover:border-black/20 hover:text-black'
                                        )}
                                    >
                                        {size.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <hr className='border-gray-100 mb-10' />

                        <div className='flex flex-col sm:flex-row gap-5'>
                            <div className='flex items-center justify-between bg-gray-100 rounded-full px-6 py-4 w-full sm:w-44'>
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className='hover:text-black transition-colors opacity-60 hover:opacity-100 cursor-pointer'
                                >
                                    <Minus size={22} />
                                </button>
                                <span className='font-bold text-lg'>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className='hover:text-black transition-colors opacity-60 hover:opacity-100 cursor-pointer'
                                >
                                    <Plus size={22} />
                                </button>
                            </div>
                            <Button className='flex-1 rounded-full cursor-pointer h-full py-8 font-black text-lg bg-black hover:bg-black/90 shadow-2xl hover:shadow-black/20 transition-all uppercase tracking-widest'>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='mt-20 border-b border-gray-100 mb-10'>
                    <div className='flex justify-between md:justify-around overflow-x-auto no-scrollbar'>
                        {['details', 'reviews', 'faqs'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    'pb-6 px-10 text-lg font-medium transition-all relative shrink-0 cursor-pointer',
                                    activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                )}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('faqs', 'FAQs').replace('reviews', 'Rating & Reviews').replace('details', 'Product Details')}
                                {activeTab === tab && (
                                    <div className='absolute bottom-0 left-0 w-full h-0.5 bg-black transition-all' />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='mb-20'>
                    {activeTab === 'reviews' && (
                        <div className='max-w-4xl mx-auto'>
                            <div className='flex items-center justify-between mb-8'>
                                <div className='flex items-center gap-2'>
                                    <h2 className='text-2xl font-bold'>All Reviews</h2>
                                    <span className='text-gray-400 font-normal'>(0)</span>
                                </div>
                                <div className='flex gap-3'>
                                    <button className='p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all'>
                                        <SlidersHorizontal size={20} />
                                    </button>
                                    <button className={cn('hidden md:flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full font-bold group hover:bg-black hover:text-white transition-all')}>
                                        Latest <ChevronDown size={18} className='group-hover:rotate-180 transition-transform' />
                                    </button>
                                    <Button className='rounded-full px-8 py-6 font-bold'>Write a Review</Button>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                {reviews.map((review, idx) => (
                                    <div key={idx} className='p-8 border border-gray-100 rounded-[32px] bg-white hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300'>
                                        <div className='flex items-center justify-between mb-4'>
                                            <div className='flex gap-1'>
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star
                                                        key={s}
                                                        size={18}
                                                        className={cn(s <= review.rating ? 'text-yellow-400' : 'text-gray-200')}
                                                        fill={s <= review.rating ? 'currentColor' : 'none'}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <h4 className='font-bold text-lg'>{review.name}</h4>
                                            {review.verified && (
                                                <MapPinCheckInside size={19} className='text-[#01AB31]' />
                                            )}
                                        </div>
                                        <p className='text-gray-500 leading-relaxed mb-6 italic'>"{review.text}"</p>
                                        <p className='text-gray-400 text-sm font-medium'>Posted on {review.date}</p>
                                    </div>
                                ))}
                            </div>

                            <div className='mt-10 flex justify-center'>
                                <Button variant="outline" className='rounded-full px-10 py-6 font-bold border-gray-200 hover:bg-black hover:text-white transition-all'>
                                    Load More Reviews
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div className='max-w-4xl mx-auto'>
                            <h2 className='text-3xl font-bold mb-8 uppercase tracking-tighter'>Specifications</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20'>
                                {[
                                    { label: 'Material', value: '100% Sustainable Cotton' },
                                    { label: 'Fit Type', value: 'Classic / Regular Fit' },
                                    { label: 'Neckline', value: 'Crew Neck' },
                                    { label: 'Sleeve Length', value: 'Short Sleeves' },
                                    { label: 'Care', value: 'Machine wash cold, tumble dry low' },
                                    { label: 'Origin', value: 'Crafted in Uzbekistan' }
                                ].map((spec, i) => (
                                    <div key={i} className='flex justify-between border-b border-gray-50 pb-4'>
                                        <span className='text-gray-400 font-medium'>{spec.label}</span>
                                        <span className='text-black font-bold'>{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'faqs' && (
                        <div className='max-w-4xl mx-auto space-y-4'>
                            {[
                                { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days within Uzbekistan and 7-14 days internationally." },
                                { q: "What is your return policy?", a: "We offer a 30-day money-back guarantee for all unworn and unwashed items with original tags." },
                                { q: "How do I choose the right size?", a: "Please refer to our size guide link below the size selectors for detailed measurements." }
                            ].map((faq, i) => (
                                <div key={i} className='p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group'>
                                    <div className='flex items-center justify-between'>
                                        <h4 className='font-bold text-lg'>{faq.q}</h4>
                                        <Plus size={20} className='group-hover:rotate-45 transition-transform' />
                                    </div>
                                    <p className='mt-4 text-gray-500 hidden group-hover:block transition-all'>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Related Products Section */}
                <div className='mt-32 border-t border-gray-100 pt-32 pb-20'>
                    <h2 className={cn('text-4xl md:text-5xl lg:text-6xl font-black text-center uppercase mb-20 tracking-tighter', monsterrat.className)}>
                        You might also like
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {relatedProducts?.data?.map((relatedProduct) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
