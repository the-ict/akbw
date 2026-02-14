'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoadingAnimation');

    if (!hasSeenLoading) {
      setShouldShow(true);

      const timer = setTimeout(() => {
        handleAnimationEnd();
      }, 3500);

      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
      setIsLoading(false);
    }
  }, []);

  const handleAnimationEnd = () => {
    setIsFadingOut(true);

    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasSeenLoadingAnimation', 'true');
    }, 800);
  };

  if (!shouldShow) {
    return null;
  }

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-white',
        'transition-opacity duration-700 ease-out',
        isFadingOut ? 'opacity-0' : 'opacity-100',
      )}
    >
      <video
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={handleAnimationEnd}
      >
        <source src="/videos/animation.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
