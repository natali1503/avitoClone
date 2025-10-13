import { useCallback, useEffect, useState } from 'react';

import { useMode } from '../theme';

type XOR<T, U> = T | U extends object
  ? (T & { [K in Exclude<keyof U, keyof T>]?: never }) | (U & { [K in Exclude<keyof T, keyof U>]?: never })
  : T | U;

interface IBreakpointOverlapValue {
  breakpointOverlapValue?: number;
}

interface IBreakpointOverlapExpression {
  breakpointOverlapExpression?: () => boolean;
}

type IUseBreakpointOverlap = XOR<IBreakpointOverlapValue, IBreakpointOverlapExpression>;

export function useBreakpointOverlap({
  breakpointOverlapValue,
  breakpointOverlapExpression,
}: IUseBreakpointOverlap = {}) {
  const [theme] = useMode();

  const breakpointOverlapFn = useCallback(() => {
    if (breakpointOverlapValue) return window.innerWidth <= breakpointOverlapValue;
    if (breakpointOverlapExpression) return breakpointOverlapExpression();
    else return window.innerWidth <= theme.breakpoints.values.sm;
  }, [breakpointOverlapValue, breakpointOverlapExpression, theme.breakpoints.values.sm]);

  const [isBreakpointOverlap, setIsBreakpointOverlap] = useState<boolean>(breakpointOverlapFn);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsBreakpointOverlap(breakpointOverlapFn());
    };

    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, [breakpointOverlapFn]);

  return { isBreakpointOverlap };
}
