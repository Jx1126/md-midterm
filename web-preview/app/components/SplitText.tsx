"use client";

import { useSprings, animated, SpringConfig, easings } from '@react-spring/web';
import { useEffect, useRef, useState, useId } from 'react';

// Type that allows either a function or a string for easing
type EasingType = ((t: number) => number) | keyof typeof easings;

interface SplitTextProps {
    text?: string;
    className?: string;
    delay?: number;
    animationFrom?: { opacity: number; transform: string };
    animationTo?: { opacity: number; transform: string };
    easing?: EasingType;
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
    onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
    text = '',
    className = '',
    delay = 100,
    animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = (t: number) => t,
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    onLetterAnimationComplete,
}) => {
    // Convert string easing to function if needed
    const easingFn = typeof easing === 'string' 
        ? (easings as any)[easing] || ((t: number) => t) 
        : easing;
    
    const words = text.split(' ').map(word => word.split(''));
    const letters = words.flat();
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);
    const animatedCount = useRef(0);
    const uniqueId = useId(); // Generate stable IDs for keys

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    // Reset animation count when text changes
    useEffect(() => {
        animatedCount.current = 0;
    }, [text]);

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: animationFrom,
            to: inView
                ? async (next: (props: { opacity: number; transform: string }) => Promise<void>) => {
                    await next(animationTo);
                    animatedCount.current += 1;
                    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
                        onLetterAnimationComplete();
                    }
                }
                : animationFrom,
            delay: i * delay,
            config: { easing: easingFn },
        }))
    );

    const AnimatedSpan = animated('span');

    return (
        <p
            ref={ref}
            className={`split-parent overflow-hidden inline ${className}`}
            style={{ textAlign, whiteSpace: 'normal', wordWrap: 'break-word' }}
        >
            {words.map((word, wordIndex) => (
                <span key={`${uniqueId}-word-${wordIndex}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.map((letter, letterIndex) => {
                        const index = words
                            .slice(0, wordIndex)
                            .reduce((acc, w) => acc + w.length, 0) + letterIndex;

                        return (
                            <AnimatedSpan
                                key={`${uniqueId}-letter-${index}`}
                                style={{
                                    ...springs[index],
                                    display: 'inline-block',
                                    transform: springs[index].transform,
                                    willChange: 'transform, opacity'
                                }}
                            >
                            {letter}
                            </AnimatedSpan>
                        );
                    })}
                    <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
                </span>
            ))}
        </p>
    );
};

export default SplitText;