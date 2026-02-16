import { useCallback, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageTransitionContext } from '../contexts/PageTransitionContext';
import './RootLayout.css';

export default function RootLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [transitionClass, setTransitionClass] = useState('page-transition--enter');
  const pendingPath = useRef<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const navigateTo = useCallback(
    (path: string) => {
      if (path === pathname) return;
      pendingPath.current = path;
      setTransitionClass('page-transition--exit');
    },
    [pathname],
  );

  function handleAnimationEnd(e: React.AnimationEvent) {
    // Only react to animations on the wrapper itself
    if (e.target !== wrapperRef.current) return;

    if (transitionClass === 'page-transition--exit' && pendingPath.current) {
      navigate(pendingPath.current);
      pendingPath.current = null;
      window.scrollTo(0, 0);
      setTransitionClass('page-transition--enter');
    }
  }

  return (
    <PageTransitionContext.Provider value={{ navigateTo }}>
      <div className="root-layout">
        <Navbar />
        <main className="root-layout__content">
          <div
            ref={wrapperRef}
            className={transitionClass}
            onAnimationEnd={handleAnimationEnd}
          >
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </PageTransitionContext.Provider>
  );
}
