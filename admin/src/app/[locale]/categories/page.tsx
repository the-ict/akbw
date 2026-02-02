import React from 'react';
import Categories from '@/features/categories/ui';
import { setRequestLocale } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function CategoriesPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <Categories />;
}
