import React from 'react';
import { COMPANY_INFO } from '../data/sidemaData';
import { SafeImage } from './SafeImage';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/');
  };

  return (
    <footer id="bottom" className="bg-white text-[#212529]">
      {/* Main white footer contact section */}
      <div>
        <section className="pt-8 pb-4">
          <div className="sidema-container">
            <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-4">
              {/* Col 1 */}
              <div className="py-4">
                <h4 className="mb-2 text-[calc(1.275rem+0.3vw)] font-bold leading-[1.2] text-[#212529]">
                  Contáctanos para ofrecerte una solución integral
                </h4>
                <p className="mb-0 text-[1rem] text-[#212529]">
                  {COMPANY_INFO.hours}
                </p>
              </div>

              {/* Col 2: Phones */}
              <div className="py-4">
                <p className="mb-2 text-[1rem] text-[#212529]">Llámanos</p>
                <div className="space-y-1">
                  {COMPANY_INFO.phones.map((item) => (
                    <h5
                      key={item.number}
                      className="mb-1 text-[18px] font-bold leading-[1.2] text-[#212529] tabular-nums"
                    >
                      <a
                        href={`tel:+58${item.number.replace(/\s+/g, '').replace(/^0/, '')}`}
                        className="text-inherit no-underline hover:text-[#003485]"
                      >
                        {item.bold ? <strong>{item.number}</strong> : item.number}
                      </a>
                    </h5>
                  ))}
                </div>
              </div>

              {/* Col 3: Email */}
              <div className="py-4">
                <p className="mb-2 text-[1rem] text-[#212529]">Envíanos un mensaje</p>
                <h5 className="mb-0 text-[calc(1.25625rem+0.075vw)] font-bold leading-[1.2]">
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-[#003485] no-underline hover:text-[#001639] hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </h5>
              </div>

              {/* Col 4: Empty balance column as in original */}
              <div className="hidden py-4 lg:block" />
            </div>
          </div>
        </section>

        {/* Horizontal divider */}
        <section>
          <div className="sidema-container">
            <div className="py-4">
              <hr className="mx-auto w-full border-0 border-t border-[#6C757D]" />
            </div>
          </div>
        </section>

        {/* Logo + Inicio row */}
        <section>
          <div className="sidema-container">
            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
              <div className="pb-4 lg:w-2/12">
                <a
                  href="/"
                  onClick={handleHomeClick}
                  className="inline-block"
                  title="SIDEMACA"
                >
                  <SafeImage
                    src="/assets/sidema-logo.png"
                    alt="SIDEMA C.A."
                    className="h-auto max-w-full object-contain"
                  />
                </a>
              </div>
              <div className="pb-4 text-right lg:w-10/12">
                <ul className="m-0 list-none p-0">
                  <li className="inline-block">
                    <a
                      href="/"
                      onClick={handleHomeClick}
                      className="text-[#003485] no-underline hover:text-[#001639] hover:underline"
                    >
                      Inicio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Dark Copyright Bar (#201c20) */}
      <div className="bg-[#201c20] py-3 text-white">
        <div className="sidema-container">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="text-center text-sm text-white/70 sm:text-left">
              <span className="mr-2">{COMPANY_INFO.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
