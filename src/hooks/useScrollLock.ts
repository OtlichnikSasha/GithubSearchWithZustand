import { useCallback } from 'react';
import { isIOS } from '../helpers/isIOS.helper';

export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarCompensation}px`;

    document.body.classList.add('modal-open');

    if (isIOS()) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.classList.remove('modal-open');

    if (isIOS()) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
