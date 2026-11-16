import React from 'react';
import {
  ALIMENTICIO_PRODUCTS,
  INDUSTRIAL_PRODUCTS,
  SERVICIOS_ITEMS,
} from '../data/sidemaData';
import type { ProductCardItem } from '../types';
import { SafeImage } from '../components/SafeImage';
import { ScrollReveal } from '../components/ScrollReveal';

const ProductCard: React.FC<{ item: ProductCardItem; index: number }> = ({
  item,
  index,
}) => {
  const colPos = index % 3;
  const direction = colPos === 0 ? 'left' : colPos === 1 ? 'bottom' : 'right';

  return (
    <div className="py-8 text-center">
      <ScrollReveal direction={direction} delayMs={colPos * 120}>
        <SafeImage
          src={item.image}
          alt={item.alt}
          className="mx-auto mb-3 h-auto max-w-full"
        />
        <h3 className="font-headings mb-2 text-[24px] font-bold leading-[1.2] text-[#212529]">
          {item.title}
        </h3>
        <p className="mb-0 text-[1rem] leading-[1.5] text-[#212529]">
          {item.description}
        </p>
      </ScrollReveal>
    </div>
  );
};

export const ProductosPage: React.FC = () => {
  return (
    <main className="overflow-x-hidden">
      {/* Top Blue Banner (o_cc4) */}
      <section className="bg-[#003485] pt-8 pb-4 text-white">
        <div className="sidema-container">
          <ScrollReveal direction="left">
            <h3 className="font-headings mb-2 text-left text-[calc(1.35rem+1.2vw)] font-bold leading-[1.2] text-white">
              Nuestros Productos
            </h3>
            <p className="mb-4 text-left text-[1rem] leading-[1.5] text-white">
              Contáctanos para recibir una asesoría personalizada y conocer nuestros productos con
              calidad certificada ISO.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTOR ALIMENTICIO SANITARIO */}
      <section id="SECTOR-ALIMENTICIO-SANITARIO" className="pt-10 pb-0">
        <div className="sidema-container text-center">
          <ScrollReveal direction="bottom">
            <h1 className="font-headings mb-2 text-[36px] font-bold leading-[1.2] text-[#003485]">
              SECTOR ALIMENTICIO SANITARIO
            </h1>
            <p className="mb-4 text-[1rem] leading-[1.5] text-[#212529]">
              Conoce nuestras bandas transportadoras sanitarias, aprobadas por la FDA y la EU,
              fabricadas con materiales de alta calidad cómo PVC, PU y polipropileno.
            </p>
            <p className="mb-4 text-[1rem] leading-[1.5] text-[#212529]">
              Nuestras bandas son resistentes a la humedad, a aceites y grasas minerales y vegetales,
              con acabados brillantes, mate y tejido.
            </p>
            <p className="mb-4 text-[1rem] leading-[1.5] text-[#212529]">
              Ofrecemos excelentes alternativas garantizando la mejor calidad para el sector
              alimentario.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pt-8 pb-0">
        <div className="sidema-container">
          <div className="grid grid-cols-1 gap-x-[30px] lg:grid-cols-3">
            {ALIMENTICIO_PRODUCTS.map((item, idx) => (
              <ProductCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTOR INDUSTRIAL Y AGRÍCOLA */}
      <section id="SECTOR-TRANSPORTE-Y-PAQUETERIA" className="pt-10 pb-0">
        <div className="sidema-container text-center">
          <ScrollReveal direction="bottom">
            <h1 className="font-headings mb-2 text-[36px] font-bold leading-[1.2] text-[#003485]">
              SECTOR INDUSTRIAL Y AGRÍCOLA
            </h1>
            <p className="mb-0 text-[1rem] leading-[1.5] text-[#212529]">
              Contamos con bandas para la industria alimenticia, agrícola e industrial, para contacto
              directo con el producto como en áreas de empaque, con amplias soluciones para distintas
              aplicaciones. También disponemos de cangilones de Poliamida y Polietileno, resistentes
              a la abrasión, antiestáticos y con capacidad de elevación excepcional. Contamos con
              cadenas table top fabricadas en acero inoxidable y acetal. Mallas kevlar y telas de
              teflón.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pt-0 pb-8">
        <div className="sidema-container">
          <div className="grid grid-cols-1 gap-x-[30px] lg:grid-cols-3">
            {INDUSTRIAL_PRODUCTS.map((item, idx) => (
              <ProductCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="SERVICIOS" className="pt-10 pb-0">
        <div className="sidema-container text-center">
          <ScrollReveal direction="bottom">
            <h1 className="font-headings mb-2 text-[36px] font-bold leading-[1.2] text-[#003485]">
              SERVICIOS
            </h1>
            <p className="mb-4 text-[1rem] leading-[1.5] text-[#212529]">
              Ofrecemos servicios de vulcanizado de bandas transportadoras de PVC y PU y correas
              tubulares, en nuestro taller o directamente en planta para instalación en equipos que no
              pueden desarmarse.
            </p>
            <p className="mb-4 text-[1rem] leading-[1.5] text-[#212529]">
              ¡Son mas de 30 años ofreciendo soluciones exitosamente!
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pt-0 pb-8">
        <div className="sidema-container">
          <div className="grid grid-cols-1 gap-x-[30px] lg:grid-cols-3">
            {SERVICIOS_ITEMS.map((item, idx) => (
              <ProductCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
