import Product from '@/features/product/ui';
import React from 'react';

interface ProductPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return (
    <>
      <Product id={id} />
    </>
  );
}
