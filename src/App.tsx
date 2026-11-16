/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ContactUsPage } from './pages/ContactUsPage';
import { HistoriaPage } from './pages/HistoriaPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProductosPage } from './pages/ProductosPage';
import type { RoutePath } from './types';

function normalizePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/nuestra-historia') return '/nuestra-historia';
  if (clean === '/productos') return '/productos';
  if (clean === '/contactus') return '/contactus';
  if (clean === '/web/login') return '/web/login';
  return '/';
}

const PAGE_TITLES: Record<RoutePath, string> = {
  '/': 'Home | SIDEMACA',
  '/nuestra-historia': 'Nuestra Historia | SIDEMACA',
  '/productos': 'Productos | SIDEMACA',
  '/contactus': 'Contáctanos | SIDEMACA',
  '/web/login': 'Identificarse | SIDEMACA',
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    normalizePath(window.location.pathname)
  );

  const scrollToHashOrTop = useCallback((hash: string) => {
    if (hash) {
      const targetId = decodeURIComponent(hash.replace(/^#/, ''));
      setTimeout(() => {
        const el =
          document.getElementById(targetId) ||
          document.getElementById(targetId.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const navigate = useCallback(
    (target: string) => {
      const [rawPath, rawHash] = target.split('#');
      const nextPath = normalizePath(rawPath || '/');
      const nextUrl = rawHash ? `${nextPath}#${rawHash}` : nextPath;

      if (window.location.pathname + window.location.hash !== nextUrl) {
        window.history.pushState({}, '', nextUrl);
      }
      setCurrentPath(nextPath);
      scrollToHashOrTop(rawHash ? `#${rawHash}` : '');
    },
    [scrollToHashOrTop]
  );

  useEffect(() => {
    document.title = PAGE_TITLES[currentPath];
  }, [currentPath]);

  useEffect(() => {
    const handlePopState = () => {
      const next = normalizePath(window.location.pathname);
      setCurrentPath(next);
      scrollToHashOrTop(window.location.hash);
    };
    window.addEventListener('popstate', handlePopState);
    if (window.location.hash) {
      scrollToHashOrTop(window.location.hash);
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollToHashOrTop]);

  const renderPage = () => {
    switch (currentPath) {
      case '/nuestra-historia':
        return <HistoriaPage onNavigate={navigate} />;
      case '/productos':
        return <ProductosPage />;
      case '/contactus':
        return <ContactUsPage />;
      case '/web/login':
        return <LoginPage onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div id="wrapwrap" className="flex min-h-screen flex-col bg-white text-[#212529]">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <div className="flex-1">{renderPage()}</div>
      <Footer onNavigate={navigate} />
    </div>
  );
}
