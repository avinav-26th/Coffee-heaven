// components/CartInitializer.js
"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useCartStore from '@/store/useCartStore';

export default function CartInitializer() {
  const { data: session, status } = useSession();
  const { hydrateCart, isHydrated } = useCartStore();

  useEffect(() => {
    if (status === 'authenticated' && !isHydrated) {
      hydrateCart();
    }
  }, [status, isHydrated, hydrateCart]);

  return null; // This component renders nothing
}