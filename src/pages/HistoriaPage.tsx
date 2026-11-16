import React from 'react';
import { BRAND_PARTNERS } from '../data/sidemaData';
import { SafeImage } from '../components/SafeImage';

interface HistoriaPageProps {
  onNavigate: (path: string) => void;
}

export const HistoriaPage: React.FC<HistoriaPageProps> = ({ onNavigate }) => {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/contactus');
  };

  return (
    <main>
      {/* Parallax Cover Section with Diagonal Bottom Shape */}
      <section className="relative flex min-h-[55vh] flex-col justify-around overflow-hidden bg-black/50 pt-12 pb-[232px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/historia-bg-2.jpg")' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(11, 80, 173, 0.91) 0%, rgba(255, 255, 255, 0.5) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-bottom bg-no-repeat"
          style={{
            backgroundImage: 'url("/assets/shape-02-001.svg")',
            backgroundSize: '100% auto',
          }}
        />

        <div className="sidema-container relative z-10 text-center text-white">
          <h1 className="mb-4 text-center">
            <SafeImage
              src="/assets/sidema-logo.png"
              alt="SIDEMA C.A."
              className="mx-auto inline-block h-auto max-w-full"
            />
          </h1>

          <p className="mb-4 text-center text-[1.25rem] font-light leading-[1.5] text-white">
            Como proveedores de servicios y materiales, nos hemos convertido en un punto de
            referencia en valores como calidad, confiabilidad, solidez comercial, asistencia técnica
            en planta y atención al cliente.
          </p>
          <p className="mb-0 text-center text-[1.25rem] font-light leading-[1.5] text-white">
            Todo esto gracias a la dedicación y experiencia de nuestros equipos de trabajo, el
            respaldo de nuestros fabricantes y la excelente dotación de nuestros inventarios.
          </p>
        </div>
      </section>

      {/* Company History Text Block */}
      <section className="py-10">
        <div className="sidema-container text-[#212529]">
          <p className="mb-4 text-[18px] leading-[1.5]">
            Sidema es una organización empresarial fundada en el año 1983, establecida en la ciudad
            de Maracay, estado Aragua, dedicada a la importación, distribución, comercialización y
            suministro de productos industriales con certificación mundial de calidad ISO.
          </p>
          <p className="mb-0 text-[18px] leading-[1.5]">
            Somos <strong>representantes exclusivos</strong> para Venezuela de las prestigiosas
            marcas <strong>ESBELT</strong> y <strong>TRANSMISIONES MECÁNICAS AVE</strong>, cuya
            amplia gama de productos se complementa para abarcar todo tipo de soluciones a los
            requerimientos de la industria venezolana en las áreas de transporte de materiales ya
            sea por bandas transportadoras, bandas elevadoras de cangilones, cadenas table top o
            cadenas modulares, y transmisión de fuerza por correas planas.
          </p>
        </div>
      </section>

      {/* Brand Partners Grid (s_product_list) */}
      <section className="pt-5">
        <div className="sidema-container">
          <div className="grid grid-cols-1 gap-x-[30px] lg:grid-cols-3">
            {BRAND_PARTNERS.map((brand) => (
              <div
                key={brand.id}
                className="relative mb-5 h-[200px] pb-14 text-center"
              >
                {brand.url ? (
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <SafeImage
                      src={brand.image}
                      alt={brand.name}
                      className="mx-auto max-h-[130px] w-auto max-w-full object-contain"
                    />
                  </a>
                ) : (
                  <SafeImage
                    src={brand.image}
                    alt={brand.name}
                    className="mx-auto max-h-[130px] w-auto max-w-full object-contain"
                  />
                )}

                {brand.url && brand.buttonLabel && (
                  <div className="absolute right-[10%] bottom-0 left-[10%]">
                    <a
                      href={brand.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-[#003485] bg-[#003485] px-[1.35rem] py-[0.45rem] text-[1rem] font-normal text-white transition-colors hover:border-[#002a6a] hover:bg-[#002c71]"
                    >
                      {brand.buttonLabel}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Block (o_cc4: #003485) */}
      <section className="bg-[#003485] py-14 text-center text-white">
        <div className="sidema-container">
          <div className="pb-4">
            <h3 className="font-headings mb-2 text-[calc(1.35rem+1.2vw)] font-bold italic leading-[1.2] text-white">
              Únete a la creciente comunidad
            </h3>
            <h3 className="font-headings mb-2 text-[calc(1.35rem+1.2vw)] font-bold italic leading-[1.2] text-white">
              de clientes satisfechos de Sidema.
            </h3>
            <h3 className="font-headings mb-2 text-[calc(1.35rem+1.2vw)] font-bold italic leading-[1.2] text-white">
              Confía en nosotros para proteger tus recursos
            </h3>
            <h3 className="font-headings mb-4 text-[calc(1.35rem+1.2vw)] font-bold italic leading-[1.2] text-white">
              y optimizar las operaciones.
            </h3>
            <p className="mb-4 text-[1rem] leading-[1.5] text-white">
              Contáctanos hoy mismo para una reunión personalizada y te diremos cómo podemos
              ayudarte.
            </p>
          </div>

          <div className="pt-2">
            <a
              href="/contactus"
              onClick={handleContactClick}
              className="mb-2 inline-block rounded-full border border-[#201c20] bg-[#201c20] px-[1.8rem] py-[0.6rem] text-[1.25rem] font-normal leading-[1.5] text-white transition-colors hover:border-[#1a161a] hover:bg-[#1b181b]"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
