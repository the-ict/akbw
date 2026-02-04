'use client';

import { useEffect, useState } from 'react';
import { useAdminAuthStore } from '../store/auth.store';
import AdminLayout from '@/widgets/layout/ui';
import { usePathname, useRouter } from '@/shared/config/i18n/navigation';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const { adminToken } = useAdminAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // usePathname from next-intl/navigation doesn't include the locale
    const isLoginPage = pathname === '/login' || pathname.startsWith('/login/');

    useEffect(() => {
        if (!mounted) return;

        if (!adminToken && !isLoginPage) {
            router.push('/login');
        } else if (adminToken && isLoginPage) {
            router.push('/');
        }
    }, [adminToken, pathname, router, mounted, isLoginPage]);

    // Prevent flash of content during hydration
    if (!mounted) return null;

    if (isLoginPage) {
        return <>{children}</>;
    }

    // If we are not on login page and have no token, still render nothing while redirecting
    if (!adminToken) {
        return null;
    }

    return <AdminLayout>{children}</AdminLayout>;
}
