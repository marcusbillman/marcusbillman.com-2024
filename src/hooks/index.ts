import { useEffect, useState } from 'react';

/**
 * Custom hook that tracks the intersection of a specified DOM element using the Intersection Observer API.
 * @param selector The CSS selector for the target element.
 * @param options The options for the Intersection Observer.
 * @returns A boolean indicating if the target element is intersecting.
 */
export const useIntersectionObserverSelector = (
  selector: string,
  options?: IntersectionObserverInit,
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const target = document.querySelector(selector);
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(target);

    return () => observer.disconnect();
  }, [selector, options]);

  return isIntersecting;
};
