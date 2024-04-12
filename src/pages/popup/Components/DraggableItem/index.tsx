import React, { useState } from 'react';
import { useMeasurePosition } from '@root/src/shared/hooks/use-measure-position';
import { motion } from 'framer-motion';

export function DraggableItem({ i, height, updatePosition, updateOrder, children }) {
  const [isDragging, setDragging] = useState(false);

  const ref = useMeasurePosition(pos => updatePosition(i, pos));

  return (
    <div
      style={{
        padding: 0,
        marginBottom: 10,
        height,
        // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
        zIndex: isDragging ? 3 : 1,
      }}>
      <motion.div
        ref={ref}
        layout
        initial={false}
        style={{
          background: 'transparent',
          height,
          borderRadius: 5,
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: '0px 3px 3px rgba(0,0,0,0.15)',
        }}
        whileTap={{
          scale: 1.12,
          boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
        }}
        drag="y"
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onViewportBoxUpdate={(_viewportBox, delta) => {
          isDragging && updateOrder(i, delta.y.translate);
        }}>
        {children}
      </motion.div>
    </div>
  );
}
