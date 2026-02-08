import Product from '@/features/product/ui'
import React from 'react'

interface ProductPageProps {
    params: {
        id: string;
        locale: string;
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    return (
        <>
            <Product id={params.id} />
        </>
    )
}
