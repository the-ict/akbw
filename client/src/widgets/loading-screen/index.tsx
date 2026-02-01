'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [shouldShow, setShouldShow] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Check if this is the first load in this session
        const hasSeenLoading = sessionStorage.getItem('hasSeenLoadingAnimation');

        if (!hasSeenLoading) {
            setShouldShow(true);

            // Wait for video to end (animation.mp4 duration - adjust if needed)
            // Assuming the video is around 3-4 seconds
            const timer = setTimeout(() => {
                handleAnimationEnd();
            }, 3500); // Adjust this duration to match your video length

            return () => clearTimeout(timer);
        } else {
            // User has already seen the animation in this session
            setShouldShow(false);
            setIsLoading(false);
        }
    }, []);

    const handleAnimationEnd = () => {
        // Start fade-out transition
        setIsFadingOut(true);

        // Wait for fade-out to complete before unmounting
        setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('hasSeenLoadingAnimation', 'true');
        }, 800); // Match this with the transition duration
    };

    // Don't render anything if user has already seen the animation
    if (!shouldShow) {
        return null;
    }

    // Don't render if loading is complete
    if (!isLoading) {
        return null;
    }

    return (
        <div className={cn(
            "fixed inset-0 z-[9999] flex items-center justify-center bg-white",
            "transition-opacity duration-700 ease-out",
            isFadingOut ? "opacity-0" : "opacity-100"
        )}>
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
