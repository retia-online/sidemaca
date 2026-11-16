import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/sidemaData';
import type { RoutePath } from '../types';
import { SafeImage } from './SafeImage';

interface HeaderProps {
  currentPath: RoutePath;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; path: RoutePath }[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Nuestra Historia', path: '/nuestra-historia' },
    { label: 'Productos', path: '/productos' },
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      id="top"
      className="sticky top-0 z-[1030] bg-white shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)]"
    >
      <nav aria-label="Navegación principal" className="w-full bg-white text-[#212529]">
        <div className="sidema-container flex flex-col items-center">
          {/* Top Row: Spacer (left) | Centered Logo | Phone (right) */}
          <div className="flex w-full flex-wrap items-center justify-between py-2 lg:flex-nowrap lg:py-0">
            {/* Left balancing spacer on lg+ matching Odoo's .o_header_centered_logo */}
            <div className="hidden lg:block lg:w-[40%]" />

            {/* Brand Logo */}
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="navbar-brand m-0 flex shrink-0 items-center py-0"
              title="SIDEMACA"
              aria-label="Logo of SIDEMACA"
            >
              <SafeImage
                src="/assets/logo-header.png"
                alt="SIDEMACA"
                className="block h-[3.25rem] w-auto object-contain"
              />
            </a>

            {/* Right phone info on lg+ */}
            <div className="hidden text-right lg:block lg:w-[40%]">
              <small className="inline-flex items-center text-[0.875em] text-[#212529]">
                <Phone className="mr-2 h-3.5 w-3.5 text-[#212529]" strokeWidth={2.2} />
                <a
                  href={`tel:${COMPANY_INFO.primaryPhone}`}
                  className="text-[#003485] hover:text-[#001639] hover:underline whitespace-nowrap"
                >
                  {COMPANY_INFO.primaryPhone}
                </a>
              </small>
            </div>

            {/* Mobile right actions: Contáctanos + Hamburger */}
            <div className="ml-auto flex items-center gap-3 lg:hidden">
              <a
                href="/contactus"
                onClick={(e) => handleLinkClick(e, '/contactus')}
                className="inline-block whitespace-nowrap rounded-full border border-[#003485] bg-[#003485] px-[1.1rem] py-[0.4rem] text-sm font-normal text-white transition-colors hover:bg-[#002c71]"
              >
                Contáctanos
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-label="Abrir menú de navegación"
                className="inline-flex h-10 w-10 items-center justify-center rounded border border-[#DEE2E6] text-[#212529] transition-colors hover:bg-[#f9f9f9]"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Second Row: Separator + Centered Menu + Contáctanos CTA */}
          <div
            className={`${
              mobileMenuOpen ? 'block' : 'hidden'
            } w-full pb-4 lg:flex lg:flex-col lg:pb-0`}
          >
            {/* Thin horizontal separator matching Odoo's vertical header */}
            <div className="w-full py-0">
              <hr className="mx-auto my-2 w-full border-0 border-t border-[#DEE2E6]" />
            </div>

            <div className="flex w-full flex-col items-start justify-between gap-2 pb-2 lg:flex-row lg:items-center lg:pb-2">
              {/* Left balance spacer on desktop so ul#top_menu is centered */}
              <div className="hidden lg:block lg:w-[140px]" />

              <ul
                id="top_menu"
                role="menu"
                className="font-headings flex flex-col gap-1 lg:mx-auto lg:flex-row lg:items-center lg:gap-4"
              >
                {navItems.map((item) => {
                  const isActive = currentPath === item.path;
                  return (
                    <li key={item.path} role="presentation" className="nav-item">
                      <a
                        role="menuitem"
                        href={item.path}
                        onClick={(e) => handleLinkClick(e, item.path)}
                        className={`block whitespace-nowrap px-2 py-2 text-[1rem] font-normal transition-colors ${
                          isActive
                            ? 'text-black/90 font-medium'
                            : 'text-black/55 hover:text-black/75'
                        }`}
                      >
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}
                <li className="nav-item lg:ml-3">
                  <a
                    href="/web/login"
                    onClick={(e) => handleLinkClick(e, '/web/login')}
                    className={`block whitespace-nowrap px-2 py-2 text-[1rem] font-normal transition-colors ${
                      currentPath === '/web/login'
                        ? 'text-black/90 font-medium'
                        : 'text-black/55 hover:text-black/75'
                    }`}
                  >
                    Identificarse
                  </a>
                </li>
              </ul>

              {/* Mobile phone */}
              <div className="px-2 py-1 lg:hidden">
                <a
                  href={`tel:${COMPANY_INFO.primaryPhone}`}
                  className="inline-flex items-center text-sm text-[#003485]"
                >
                  <Phone className="mr-2 h-3.5 w-3.5" />
                  {COMPANY_INFO.primaryPhone}
                </a>
              </div>

              {/* Desktop primary CTA button */}
              <div className="hidden shrink-0 lg:block">
                <a
                  href="/contactus"
                  onClick={(e) => handleLinkClick(e, '/contactus')}
                  className="inline-block whitespace-nowrap rounded-full border border-[#003485] bg-[#003485] px-[1.35rem] py-[0.45rem] text-[1rem] font-normal leading-normal text-white transition-colors hover:border-[#002a6a] hover:bg-[#002c71]"
                >
                  Contáctanos
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
