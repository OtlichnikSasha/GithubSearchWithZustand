import { useRef, useEffect, useState, RefObject } from 'react';

interface IOptions {
  root?: null | HTMLElement;
  rootMargin?: string;
  threshold?: number;
}

export const useElementOnScreen = (
  options: IOptions,
): [ref: RefObject<HTMLElement>, isVisible: boolean] => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
