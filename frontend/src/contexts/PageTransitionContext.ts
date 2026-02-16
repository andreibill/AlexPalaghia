import { createContext, useContext } from 'react';

interface PageTransitionContextValue {
  navigateTo: (path: string) => void;
}

export const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigateTo: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}