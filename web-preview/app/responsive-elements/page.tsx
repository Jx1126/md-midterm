'use client';

import SplitText from '../components/SplitText';
import { easings } from '@react-spring/web';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    ExpoSnack?: {
      initialize: () => void;
      remove: () => void;
    };
  }
}

export default function ResponsiveElementsPage() {
  const snackContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = () => {
      if (typeof window !== "undefined" && window.ExpoSnack?.remove) {
        try {
          window.ExpoSnack.remove();
        } catch (e) {
          console.error("Error cleaning up Snack:", e);
        }
      }
    };

    const existingScript = document.querySelector('script[src="https://snack.expo.dev/embed.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    cleanup();

    const script = document.createElement('script');
    script.src = "https://snack.expo.dev/embed.js";
    script.async = true;
    
    script.onload = () => {
      if (typeof window !== "undefined" && window.ExpoSnack?.initialize) {
        setTimeout(() => {
          window.ExpoSnack?.initialize();
        }, 100);
      }
    };
    
    document.body.appendChild(script);

    return () => {
      cleanup();
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <SplitText
        text="Week 4 - Responsive Elements"
        className="text-4xl font-bold text-center mb-8 z-10"
        delay={50}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,100px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing={easings.easeOutElastic}
        threshold={0.1}
        rootMargin="-20px"
        onLetterAnimationComplete={handleAnimationComplete}
      />

      <div
        ref={snackContainerRef}
        data-snack-id="@jx1126/week-4---responsive-elements"
        data-snack-platform="android"
        data-snack-preview="true"
        data-snack-theme="light"
        className="overflow-hidden bg-[#fbfcfd] border border-gray-300 rounded-md w-full max-w-7xl z-50"
        style={{ height: '700px' }}
      ></div>
    </div>
  );
}