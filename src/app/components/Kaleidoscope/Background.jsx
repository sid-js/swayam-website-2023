'use client';
import React, { useState, useEffect } from 'react';
import { Kaleidoscope } from './Kaleidoscope';
import _debounce from 'lodash/debounce';

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX * 0.1,
      y: e.clientY * 0.1,
    });
    setIsMouseMoving(true);
  };

  const handleTouchMove = (e) => {
    setMousePosition({
      x: e.touches[0].clientX * 0.05,
      y: e.touches[0].clientY * 0.05,
    });
    setIsMouseMoving(true);
  };

  const updateMousePosition = () => {
    const radius = 220;
    const speed = 0.0005;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    if (!isMouseMoving) {
      const x = centerX + radius * Math.cos(speed * Date.now());
      const y = centerY + radius * Math.sin(speed * Date.now());
      setMousePosition({
        x: easeInOutQuad(mousePosition.x, x),
        y: easeInOutQuad(mousePosition.y, y),
      });
    } else {
      const smoothness = 0.1;
      const newX = easeInOutQuad(
        mousePosition.x,
        mousePosition.x * smoothness + (1 - smoothness) * centerX
      );
      const newY = easeInOutQuad(
        mousePosition.y,
        mousePosition.y * smoothness + (1 - smoothness) * centerY
      );
      setMousePosition({ x: newX, y: newY });
    }
  };

  const easeInOutQuad = (start, end) => {
    const t = 0.02; // Adjust this value for different easing behaviors
    return start + t * t * (3 - 2 * t) * (end - start);
  };

  const debouncedHandleMouseStop = _debounce(() => {
    setIsMouseMoving(false);
  }, 100); // Adjust the delay as needed

  useEffect(() => {
    const interval = setInterval(updateMousePosition, 16);

    return () => clearInterval(interval);
  }, [isMouseMoving, mousePosition]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', debouncedHandleMouseStop);
    window.addEventListener('touchmove', debouncedHandleMouseStop);

    return () => {
      window.removeEventListener('mousemove', debouncedHandleMouseStop);
      window.removeEventListener('touchmove', debouncedHandleMouseStop);
    };
  }, [debouncedHandleMouseStop]);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationAngle((prevRotationAngle) => prevRotationAngle + 0.2); // Adjust the coefficient to control the rotation speed
    }, 16);

    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <div className='absolute top-0 left-0 w-screen h-screen overflow-hidden z-0 bg-black bg-opacity-50 sm:w-full blur-[1px]'>
      <div className='absolute top-0 left-0 w-screen h-screen overflow-hidden z-10 bg-black bg-opacity-60'></div>
      <Kaleidoscope
        transform={`rotate(${rotationAngle}deg)`}
        slices={8}
        r={65}
        x={mousePosition.x}
        y={mousePosition.y}
        img={'/bg-1.jpg'}
      />
    </div>
  );
};

export default Background;
