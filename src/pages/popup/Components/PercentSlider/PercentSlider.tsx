import React, { useRef, useState, useEffect } from 'react';
import { clamp } from 'popmotion';

interface sliderProps {
  value: number;
  onValueChange: CallableFunction;
}
export const PercentSlider = ({ value, onValueChange }) => {
  const sliderRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [initialElementX, setInitialElementX] = useState(0);
  const [initialElementY, setInitialElementY] = useState(0);
  const width = 278;

  useEffect(() => {
    const handleMouseMove = event => {
      if (isDragging) {
        const half = width / 2;
        const dx = event.clientX - initialMouseX;
        const dy = event.clientY - initialMouseY;
        const newX = initialElementX + dx;
        const newY = initialElementY + dy;
        const element = document.getElementById('draggable');
        if (newX > width / 2) {
          element.className = 'thumb rise';
        } else element.className = 'thumb fall';

        const rate = (newX - half) / half;

        onValueChange(clamp(-1, 1, rate));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, initialMouseX, initialMouseY, initialElementX, initialElementY]);

  const startDragging = event => {
    setIsDragging(true);
    setInitialMouseX(event.clientX);
    setInitialMouseY(event.clientY);
    const rect = document.getElementById('draggable').getBoundingClientRect();
    setInitialElementX(rect.left - 53);
    setInitialElementY(0);
  };

  const getPositionForValue = () => {
    const half = width / 2;
    return Math.min(Math.floor(half * value + half), 260);
  };

  return (
    <div className="slider-percent" ref={sliderRef}>
      <div className="bg-fall"></div>
      <div className="bg-rise"></div>
      <div
        id="draggable"
        className={`thumb`}
        onMouseDown={startDragging}
        style={{ position: 'absolute', left: `${getPositionForValue()}px`, top: '0px', cursor: 'grab' }}></div>
    </div>
  );
};
