'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ClustrMaps() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        // Only load the script once and only in production (wenxy.pages.dev)
        if (scriptLoadedRef.current) return;
        
        // Check if we're on the production domain
        const isProduction = typeof window !== 'undefined' && 
            (window.location.hostname === 'wenxy.pages.dev' || 
             window.location.hostname === 'localhost' ||
             window.location.hostname === '127.0.0.1');

        const container = containerRef.current;
        if (!isProduction || !container) return;

        // Create and append the script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'clstr_globe';
        script.src = '//clustrmaps.com/globe.js?d=EVaQJ-TTkJcolRghSw5ItnC1jofI6PMAIl8-7qzVPXQ';
        script.async = true;

        // Add error handling
        script.onerror = () => {
            console.error('Failed to load ClustrMaps script');
        };

        container.appendChild(script);
        scriptLoadedRef.current = true;

        // Cleanup function
        return () => {
            const existingScript = container.querySelector('#clstr_globe');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 hover:shadow-lg transition-all duration-200"
        >
            <h3 className="font-semibold text-primary mb-3 text-center">Visitors</h3>
            <div 
                ref={containerRef}
                className="flex justify-center items-center min-h-[200px]"
                style={{
                    // Ensure the globe displays properly
                    width: '100%',
                    maxWidth: '280px',
                    margin: '0 auto'
                }}
            />
        </motion.div>
    );
}

