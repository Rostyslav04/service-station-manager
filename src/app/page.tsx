'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('cars');
    }, []);

    return <></>;
}
