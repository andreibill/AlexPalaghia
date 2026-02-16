import { type MouseEvent, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { usePageTransition } from '../contexts/PageTransitionContext';

type ClassNameProp =
  | string
  | ((props: { isActive: boolean; isPending: boolean }) => string);

interface TransitionLinkProps {
  to: string;
  children: ReactNode;
  navLink?: boolean;
  className?: ClassNameProp;
  end?: boolean;
  onClick?: () => void;
}

export default function TransitionLink({
  to,
  children,
  navLink,
  className,
  end,
  onClick,
}: TransitionLinkProps) {
  const { navigateTo } = usePageTransition();
  const { pathname } = useLocation();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onClick?.();
    if (to === pathname) return;
    navigateTo(to);
  }

  if (navLink) {
    return (
      <NavLink
        to={to}
        className={className as (props: { isActive: boolean; isPending: boolean }) => string}
        end={end}
        onClick={handleClick}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <Link to={to} className={className as string} onClick={handleClick}>
      {children}
    </Link>
  );
}
