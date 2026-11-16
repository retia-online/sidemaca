import React from 'react';
import { Star } from 'lucide-react';
import { HOME_MEDIA_ITEMS, WHY_CHOOSE_US } from '../data/sidemaData';
import { SafeImage } from '../components/SafeImage';
import { ScrollReveal } from '../components/ScrollReveal';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero Parallax Section */}
      <section className="relative flex min-h-screen flex-col justify-around overflow-hidden">
        {/* Background image with subtle blur matching data-gl-filter="blur" */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat blur-[3px]"
          style={{ backgroundImage: 'url("/assets/portada-sidema.jpg")' }}
        />

        {/* Gradient Filter */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(6, 34, 70, 0.87) 0%, rgba(228, 176, 7, 0.31) 100%)',
          }}
        />

        {/* Bottom Wave Shape (web_editor/Origins/14_001.svg) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-bottom bg-no-repeat"
          style={{
            backgroundImage: 'url("/assets/shape-14-001.svg")',
            backgroundSize: '100% auto',
          }}
        />

        {/* Centered Hero Content */}
        <div className="relative z-10 flex min-h-screen flex-col justify-around py-10">
          <div className="sidema-container text-center">
            <h2 className="font-headings mb-2 text-[24px] font-bold leading-[1.2] text-[#F8F9FA]">
              BIENVENIDOS A:
            </h2>

            <p className="mb-4 text-center">
              <SafeImage
                src="/assets/sidema-logo.png"
                alt="SIDEMA C.A."
                className="anim-bounce-in mx-auto block h-auto w-[78%] max-w-full sm:w-[60%] md:w-[50%]"
              />
            </p>

            <p className="mb-4" aria-hidden="true">
              <br />
            </p>

            <p className="mx-auto max-w-5xl text-center text-[24px] font-bold leading-[1.5] text-[#f9f9f9]">
              Nos encargamos de ofrecer soluciones a los requerimientos de la industria venezolana en
              las áreas de transporte de materiales y transmisión de fuerza por correas planas.
            </p>
          </div>
        </div>
      </section>

      {/* Media List Section (o_cc4: #003485) */}
      <section className="relative bg-[#003485] pt-6 pb-16">
        <div className="sidema-container">
          <div className="flex flex-col">
            {HOME_MEDIA_ITEMS.map((item, idx) => {
              const direction = idx === 1 ? 'right' : 'left';
              return (
                <div key={item.id} className={`${item.offsetClass} ${item.paddingClass}`}>
                  <ScrollReveal direction={direction}>
                    <div className="flex flex-col overflow-hidden rounded bg-white text-[#212529] shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] lg:flex-row-reverse lg:items-center">
                      {/* Image column on right */}
                      <div className="w-full self-stretch lg:w-4/12">
                        <SafeImage
                          src={item.image}
                          alt={item.alt}
                          className="h-full w-full rounded border border-[#dee2e6] bg-white p-1 object-cover"
                        />
                      </div>

                      {/* Body column on left */}
                      <div className="w-full p-8 lg:w-8/12">
                        <h3 className="font-headings mb-2 text-[calc(1.35rem+1.2vw)] font-bold leading-[1.2] text-[#003485]">
                          {item.title}
                        </h3>

                        {item.id === 'alimenticio' ? (
                          <>
                            <p className="mb-4 text-[1rem] leading-[1.5] text-[#212529]">
                              {item.paragraphs[0]}
                            </p>
                            <p className="mb-4 text-[1rem] leading-[1.5] text-[#212529]">
                              {item.paragraphs[1]}
                            </p>
                          </>
                        ) : (
                          <div className="space-y-0">
                            {item.paragraphs.map((p, pIndex) => (
                              <p
                                key={pIndex}
                                className="mb-0 text-[1rem] leading-[1.5] text-[#212529]"
                              >
                                {p}
                              </p>
                            ))}
                            <div className="h-6" />
                          </div>
                        )}

                        <p className="mb-0">
                          <a
                            href={item.href}
                            onClick={(e) => handleLink(e, item.href)}
                            className="inline-block rounded-full border border-[#003485] bg-[#003485] px-[1.35rem] py-[0.45rem] text-[1rem] font-normal leading-[1.5] text-[#f9f9f9] transition-all hover:brightness-90"
                          >
                            {item.buttonLabel}
                          </a>
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Stock Statement (o_cc1: #FFFFFF) */}
      <section className="bg-white py-14">
        <div className="sidema-container">
          <div className="pb-4 text-center">
            <h3 className="font-headings mb-2 text-[24px] font-bold leading-[1.2] text-[#003485]">
              Amplio stock en bandas transportadoras, bandas elevadores de cangilones,
            </h3>
            <h3 className="font-headings mb-0 text-[24px] font-bold leading-[1.2] text-[#003485]">
              cadenas table top y cadenas modulares.
            </h3>
          </div>
        </div>
      </section>

      {/* Why Choose Us Color Block (o_cc4: #003485) */}
      <section className="bg-[#003485] pt-10 pb-6 text-center text-white">
        <div className="sidema-container">
          <h2 className="font-headings mb-2 text-[calc(1.4rem+1.8vw)] font-bold leading-[1.2] text-white">
            ¿Por qué elegirnos?
          </h2>

          <p className="mb-4 flex items-center justify-center gap-1" aria-label="Calificación 5 estrellas">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-[#FFD700] text-[#FFD700]"
                aria-hidden="true"
              />
            ))}
          </p>

          {WHY_CHOOSE_US.map((line) => (
            <p key={line} className="mb-4 text-[18px] leading-[1.5] text-white">
              {line}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
};
