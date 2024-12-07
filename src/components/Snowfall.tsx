import  { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Snowflake {
    id: number;
    x: number;
    size: number;
    delay: number;
    duration: number;
}

const Snowfall = () => {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        // Initialize snowflakes
        const initialSnowflakes = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * windowWidth,
            size: Math.random() * 8 + 2, // 2-10px
            delay: Math.random() * 10,
            duration: Math.random() * 10 + 10 // 10-20s
        }));
        setSnowflakes(initialSnowflakes);

        // Periodically update snowflakes
        const interval = setInterval(() => {
            setSnowflakes(prev => prev.map(flake => ({
                ...flake,
                x: Math.random() * windowWidth,
                size: Math.random() * 8 + 2,
                delay: 0,
                duration: Math.random() * 10 + 10
            })));
        }, 20000); // Update every 20 seconds

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(interval);
        };
    }, [windowWidth]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            <AnimatePresence>
                {snowflakes.map((flake) => (
                    <motion.div
                        key={flake.id}
                        initial={{ y: -20, x: flake.x, opacity: 0 }}
                        animate={{
                            y: window.innerHeight + 20,
                            x: flake.x + (Math.random() * 200 - 100),
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: flake.duration,
                            delay: flake.delay,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            position: 'absolute',
                            width: flake.size,
                            height: flake.size,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            filter: 'blur(1px)',
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Snowfall;
