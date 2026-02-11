"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Star,
    Minus,
    Plus,
    Check,
    Loader2,
    MoreHorizontal,
    EllipsisVertical
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import { monsterrat } from '@/shared/fonts';
import ProductCard from '@/widgets/product';
import { useProduct } from '@/features/products/lib/hooks';
import {
    useProducts
} from '@/features/products/lib/hooks';
import {
    useProductReviews,
    useCreateReview,
    useUpdateReview
} from '@/features/reviews/lib/hooks';
import { useUserStore } from '@/shared/store/user.store';
import { toast } from '@/shared/ui/toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import DeleteConfirmModal from '@/widgets/delete-confirm/ui';
import { useDeleteReviewMutation } from '../lib/hooks';
import { useQueryClient } from '@tanstack/react-query';

interface ProductProps {
    id: string;
}

export default function Product({ id }: ProductProps) {
    const [openDeleteReview, setOpenDeleteReview] = useState<boolean>(false);
    const { data: product, isLoading, error } = useProduct(id);
    const { data: relatedProducts } = useProducts({ limit: 4 });
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [activeImage, setActiveImage] = useState<number>(0);
    const [activeTab, setActiveTab] = useState<string>('reviews');
    const [userRating, setUserRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [reviewId, setReviewId] = useState<number | null>(null);
    const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

    const { data: reviewsData, isLoading: reviewsLoading } = useProductReviews(parseInt(id));
    const deleteReviewMutation = useDeleteReviewMutation(reviewId!);
    const createReviewMutation = useCreateReview();
    const updateReviewMutation = useUpdateReview(editingReviewId!);
    const queryClient = useQueryClient();

    const { token } = useUserStore();

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

    const handleDeleteReview = async () => {
        try {
            await deleteReviewMutation.mutateAsync();
            toast.success("Review deleted successfully!");
            queryClient.invalidateQueries({
                queryKey: ["reviews"]
            })
            setOpenDeleteReview(false);
        } catch (error) {
            toast.error("Failed to delete review");
        }
    }

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

    const handleSubmitReview = async () => {
        if (!userRating || !reviewText.trim()) {
            toast.error("Please fill in all fields and select a rating");
            return;
        }

        try {
            if (editingReviewId) {
                await updateReviewMutation.mutateAsync({
                    rating: userRating,
                    comment: reviewText,
                    product_id: id,
                });
            } else {
                await createReviewMutation.mutateAsync({
                    rating: userRating,
                    comment: reviewText,
                    product_id: id,
                });
            }

            setUserRating(0);
            setReviewText('');
            toast.success("Review submitted successfully!");

        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review. Please try again.');
        }
    };

    return (
        <div className='min-h-screen bg-white'>
            <div className='container py-10 px-4 md:px-6'>
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
                                {product.rating}/<span className='text-gray-400 font-normal'>5</span>
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
                        {['reviews', 'faqs'].map((tab) => (
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
                            <DeleteConfirmModal
                                isOpen={openDeleteReview}
                                onClose={() => setOpenDeleteReview(false)}
                                onConfirm={handleDeleteReview}
                                title='Delete Review'
                                description='Are you sure you want to delete this review?'
                            />

                            {
                                token && (
                                    <div className='mb-10 p-8 border border-gray-100 rounded-[32px] bg-white shadow-sm'>
                                        <h3 className='text-xl font-bold mb-6'>Write a Review</h3>

                                        <div className='mb-6'>
                                            <p className='text-sm text-gray-500 mb-3'>Rate this product</p>
                                            <div className='flex gap-2'>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        onClick={() => setUserRating(star)}
                                                        className='hover:scale-110 transition-transform cursor-pointer'
                                                    >
                                                        <Star
                                                            size={28}
                                                            className={cn(
                                                                'transition-colors',
                                                                star <= userRating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                                                            )}
                                                            fill={star <= userRating ? 'currentColor' : 'none'}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='relative'>
                                            <textarea
                                                placeholder='Share your thoughts about this product...'
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                                className='w-full p-4 pr-24 border border-gray-200 rounded-[20px] resize-none focus:outline-none focus:border-black transition-all min-h-[100px] text-sm'
                                                maxLength={500}
                                            />

                                            <div className='flex items-center justify-between mt-3'>
                                                <span className='text-xs text-gray-400'>{reviewText.length}/500</span>

                                                <Button
                                                    onClick={handleSubmitReview}
                                                    disabled={createReviewMutation.isPending}
                                                    className='rounded-full px-8 py-2 h-auto flex items-center justify-center bg-black hover:bg-black/90 font-semibold text-sm cursor-pointer'
                                                >
                                                    {createReviewMutation.isPending ? <Loader2 className='animate-spin' size={18} /> : 'Post'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            <div className='flex items-center justify-between mb-8'>
                                <div className='flex items-center gap-2'>
                                    <h2 className='text-2xl font-bold'>Reviews</h2>
                                    <span className='text-gray-400 font-normal'>({reviewsData?.meta.total || 0})</span>
                                </div>
                            </div>

                            {reviewsLoading ? (
                                <div className='text-center py-10'>
                                    <p className='text-gray-500'>Loading reviews...</p>
                                </div>
                            ) : (
                                <div className='space-y-6'>
                                    {reviewsData?.data.map((review) => (
                                        <div key={review.id} className='p-6 border-b border-gray-100 last:border-0'>
                                            <div className='flex items-start gap-4'>
                                                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold shrink-0'>
                                                    {review.user.name.charAt(0).toUpperCase()}
                                                </div>

                                                <div className='flex-1'>
                                                    <div className='flex items-center gap-2 mb-2'>
                                                        <h4 className='font-bold text-base'>{review.user.name} {review.user.lastName}</h4>
                                                        <span className='text-gray-400 text-sm'>• {new Date(review.createdAt).toLocaleDateString()}</span>
                                                    </div>

                                                    <div className='flex gap-1 mb-3'>
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star
                                                                key={s}
                                                                size={14}
                                                                className={cn(s <= review.rating ? 'text-yellow-400' : 'text-gray-200')}
                                                                fill={s <= review.rating ? 'currentColor' : 'none'}
                                                            />
                                                        ))}
                                                    </div>

                                                    <p className='text-gray-700 leading-relaxed text-sm'>{review.comment}</p>
                                                </div>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className='outline-none'>
                                                        <EllipsisVertical size={18} className='text-gray-400 cursor-pointer' />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className='outline-none border-none p-2'>
                                                        <DropdownMenuLabel onClick={() => {
                                                            setOpenDeleteReview(true);
                                                            setReviewId(review.id);
                                                        }} className='cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-md'>Delete</DropdownMenuLabel>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!reviewsLoading && (!reviewsData?.data || reviewsData.data.length === 0) && (
                                <div className='text-center py-20'>
                                    <div className='w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4'>
                                        <Star size={32} className='text-gray-300' />
                                    </div>
                                    <h3 className='text-xl font-bold mb-2'>No reviews yet</h3>
                                    <p className='text-gray-500'>Be the first to share your thoughts!</p>
                                </div>
                            )}

                            {!reviewsLoading && reviewsData && reviewsData.data.length > 0 && reviewsData.meta.totalPages > 1 && (
                                <div className='mt-10 flex justify-center'>
                                    <Button variant="outline" className='rounded-full px-10 py-6 font-bold border-gray-200 hover:bg-black hover:text-white transition-all cursor-pointer'>
                                        Load More Reviews
                                    </Button>
                                </div>
                            )}
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
