'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GATracker() {
  const pathname = usePathname();

  useEffect(() => {
    const gtag = (window as any).gtag;
    if (!gtag) return;

    gtag('config', 'G-GBVC7Y6J4Z', {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
