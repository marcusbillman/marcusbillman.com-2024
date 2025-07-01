import type { MotionProps } from 'framer-motion';
import type { ReactElement } from 'react';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { randomInt } from '@/utils';
import { TIMING_FUNCTIONS } from '@/utils/tailwind';

type Position = { x: number; y: number };

/**
 * Get a random position that is not too close to any of the used positions.
 * @param minX Minimum x value (in percent of sandbox width).
 * @param maxX Maximum x value (in percent of sandbox width).
 * @param minY Minimum y value (in percent of sandbox height).
 * @param maxY Maximum y value (in percent of sandbox height).
 * @param usedPositions The positions that are already used.
 * @returns A random position.
 */
function getRandomSafePosition(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  usedPositions: Position[],
): Position {
  /**
   * Minimum allowed distance, in percent of the sandbox size.
   * Large values cause infinite loops. With 5 elements, values <= 30 are fine.
   */
  const DISTANCE_THRESHOLD = 20;

  let position: Position;
  do {
    position = {
      x: randomInt(minX, maxX),
      y: randomInt(minY, maxY),
    };
  } while (
    usedPositions.some((used) => distance(used, position) < DISTANCE_THRESHOLD)
  );

  usedPositions.push(position);
  return position;
}

/**
 * Calculate the euclidean distance between two positions.
 * @param a Position a.
 * @param b Position b.
 * @returns The distance between the two positions.
 */
function distance(a: Position, b: Position) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

interface Props extends React.HTMLProps<HTMLDivElement> {
  randomize?: boolean;
  children: React.ReactNode;
}

/**
 * A sandbox of elements that the user can drag around the screen. Children must be motion components.
 * @param randomize Whether to randomize the initial positions of the elements.
 * @param children The elements to display in the sandbox. The first child is assumed to be a larger element such as a heading.
 */
export default function Sandbox({
  randomize = true,
  className,
  children,
  ...props
}: Props) {
  const [elementPositions, setElementPositions] = useState<Position[]>([]);
  const constraintsRef = useRef(null);
  const dragVelocityX = useSpring(0, { stiffness: 200, damping: 20 });
  const tiltAngle = useTransform(dragVelocityX, [-1000, 1000], [-30, 30]);
  const [lastDraggedIndex, setLastDraggedIndex] = useState<number>();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (randomize) {
      const usedPositions: Position[] = [];
      const childrenArray = React.Children.toArray(children);

      setElementPositions(
        childrenArray.map((_child, index) => {
          // The first child is assumed to be a heading and therefore needs more space.
          if (index === 0) {
            return getRandomSafePosition(0, 50, 0, 70, usedPositions);
          }
          return getRandomSafePosition(0, 90, 0, 90, usedPositions);
        }),
      );
    }
  }, []);

  return (
    <div
      ref={constraintsRef}
      className={twMerge('pointer-events-none', className)}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement<MotionProps>(
            child as ReactElement<MotionProps>,
            {
              ...child.props,
              key: index,
              className: twMerge(
                'absolute pointer-events-auto motion-safe:cursor-move',
                child.props.className,
              ),
              initial: {
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.8,
              },
              animate: {
                opacity: 1,
                scale: 1,
              },
              transition: {
                delay: index * 0.1,
                duration: 0.5,
                ease: TIMING_FUNCTIONS.SMOOTH,
              },
              drag: !shouldReduceMotion,
              dragConstraints: constraintsRef,
              dragElastic: 0.05,
              onDrag: (_event, info) => {
                dragVelocityX.set(info.velocity.x);
              },
              onDragStart: () => {
                setLastDraggedIndex(index);
              },
              onDragEnd: () => {
                dragVelocityX.set(0);
              },
              style: {
                ...child.props.style,
                left: `${elementPositions[index]?.x}%`,
                top: `${elementPositions[index]?.y}%`,
                rotate: lastDraggedIndex === index ? tiltAngle : 0,
              },
            },
          );
        }
        return child;
      })}
    </div>
  );
}
