"use client";

import Link from "next/link";
import SplitText from './components/SplitText';
import { useEffect, useState } from 'react';
import { easings } from '@react-spring/web';
import SpotlightCard from './components/SpotlightCard';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 py-12">

      {isClient ? (
        <>
          <SplitText
            text="Jin軒's"
            className="text-8xl font-bold text-center mb-8"
            delay={50}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,100px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing={easings.easeOutElastic}
            threshold={0.1}
            rootMargin="-20px"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <SplitText
            text="Mobile Development Midterm Assignments!"
            className="text-5xl font-bold text-center mb-8"
            delay={20}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,100px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing={easings.easeOutElastic}
            threshold={0.1}
            rootMargin="-20px"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </>
      ) : (
        <div className="text-lg tracking-widest uppercase text-center">Loading..</div>
      )}

      <div 
        className="grid gap-6 text-center mt-8"
        suppressHydrationWarning
      >

        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
          <Link href="/name-badge">
            <span className="text-xl px-8">Week 2 - Name Badge App</span>
          </Link>
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
          <Link href="/name-badge">
            <span className="text-xl px-8">Week 3 - Hotel App Wireframe</span>
          </Link>
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
          <Link href="/responsive-elements">
            <span className="text-xl px-8">Week 4 - Responsive Elements App</span>
          </Link>
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
          <Link href="/calculator">
            <span className="text-xl px-8">Week 5 - Calculator App</span>
          </Link>
        </SpotlightCard>

      </div>
    </main>
  );
}