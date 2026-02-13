import React from 'react';
import Styles from '@/features/styles/ui';
import { setRequestLocale } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function StylesPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <Styles />;
}
