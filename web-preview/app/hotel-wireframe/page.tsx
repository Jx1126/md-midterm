"use client";

import Link from "next/link";
import SplitText from '../components/SplitText';
import { useEffect, useState } from 'react';
import { easings } from '@react-spring/web';
import SpotlightCard from '../components/SpotlightCard';

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
            text="Week 3 - Hotel App Wireframe"
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

        <a href="/wireframe-home.png" target="_blank" rel="noopener noreferrer">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
            <span className="text-xl px-8">Homepage Wireframe</span>
          </SpotlightCard>
        </a>

        <a href="/wireframe-search.png" target="_blank" rel="noopener noreferrer">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
            <span className="text-xl px-8">Search Results Page Wireframe</span>
          </SpotlightCard>
        </a>

        <a href="/wireframe-details.png" target="_blank" rel="noopener noreferrer">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
            <span className="text-xl px-8">Details Page Wireframe</span>
          </SpotlightCard>
        </a>

        <a href="/wireframe-settings.png" target="_blank" rel="noopener noreferrer">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
            <span className="text-xl px-8">Settings Page Wireframe</span>
          </SpotlightCard>
        </a>
        
        <a href="/wireframe-flowchart.png" target="_blank" rel="noopener noreferrer">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
            <span className="text-xl px-8">Wireframe Flowchart</span>
          </SpotlightCard>
        </a>

      </div>
    </main>
  );
}