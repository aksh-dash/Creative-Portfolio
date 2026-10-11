import React, { useEffect, useRef } from 'react';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const ring = ringRef.current;

        const move = (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            ring.style.left = e.clientX + 'px';
            ring.style.top = e.clientY + 'px';
        };

        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
};

export default CustomCursor;