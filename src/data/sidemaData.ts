import type { HomeMediaItem, ProductCardItem } from '../types';

export const COMPANY_INFO = {
  name: 'SIDEMACA',
  legalName: 'Sidema C.A.',
  primaryPhone: '+58 243 2466989',
  phones: [
    { number: '0243 2466989', bold: false },
    { number: '0243 2471542', bold: true },
    { number: '0243 2473995', bold: false },
    { number: '0243 2465927', bold: false },
  ],
  contactPagePhone: '+58 243 2473995',
  email: 'ventas@sidemaca.com',
  hours: 'Lunes a Viernes 8:00 am a 4:00 pm',
  address: 'Edificio virgen la milagrosa, Avenida mariño, 29 Sur, Maracay 2103, Aragua',
  copyright: 'Copyright © Sidema C.A.',
};

export const HOME_MEDIA_ITEMS: HomeMediaItem[] = [
  {
    id: 'alimenticio',
    title: 'SECTOR ALIMENTICIO SANITARIO',
    paragraphs: [
      'Conoce nuestras bandas transportadoras sanitarias, fabricadas con PVC, PU y Polipropileno, resistentes a la humedad, aceites, grasas vegetales y mineraes, aprobadas por la FDA y la EU.',
      'Se adaptan a las necesidades específicas de los diferentes procesos de producción existentes en la industria alimentaria.',
    ],
    image: '/assets/bandas-carne.jpg',
    alt: 'Bandas transportadoras sanitarias para el sector alimenticio',
    buttonLabel: 'Más Información',
    href: '/productos#SECTOR-ALIMENTICIO-SANITARIO',
    offsetClass: 'lg:w-9/12',
    paddingClass: 'py-4',
    roundedPill: true,
  },
  {
    id: 'transporte',
    title: 'SECTOR TRANSPORTE Y PAQUETERÍA',
    paragraphs: [
      'Contamos con bandas que poseen alta resistencia a la abrasión, excelente resistencia a aceites minerales y químicos, resistencia al corte, antiestáticas, y antillama para aplicaciones industriales.',
      'Cangilones de Polietileno , Poliamida y tornillos.',
      'Perfiles de PVC soldables sobre las bandas.',
      'Confía en nuestros productos duraderos y de alto rendimiento.',
    ],
    image: '/assets/cangilones-500.jpg',
    alt: 'Cangilones y bandas para transporte y paquetería',
    buttonLabel: 'Más Información',
    href: '/productos#SECTOR-TRANSPORTE-Y-PAQUETERIA',
    offsetClass: 'lg:w-9/12 lg:ml-[8.333333%]',
    paddingClass: 'py-6',
    roundedPill: true,
  },
  {
    id: 'servicios',
    title: 'SERVICIOS',
    paragraphs: [
      'Ofrecemos servicios de vulcanizado de bandas transportadoras en nuestro taller y en planta para equipos no desmontables.',
    ],
    image: '/assets/servicio-en-planta.jpg',
    alt: 'Servicio de vulcanizado de bandas transportadoras en planta',
    buttonLabel: 'Más información',
    href: '/productos#SERVICIOS',
    offsetClass: 'lg:w-9/12 lg:ml-[25%]',
    paddingClass: 'py-4',
    roundedPill: true,
  },
];

export const WHY_CHOOSE_US = [
  'Representantes exclusivos de ESBELT en Venezuela.',
  'Más de 35 años de experiencia',
  'Calidad en nuestros productos',
  'Confiabilidad y solidez comercial',
];

export const ALIMENTICIO_PRODUCTS: ProductCardItem[] = [
  {
    id: 'carnicos',
    title: 'BANDAS PARA CÁRNICOS Y EMBUTIDOS',
    description:
      'Bandas transportadoras de PVC y PU, sanitarias, aprobadas por la FDA y EU. Resistentes a la humedad, a aceites y grasas animales y vegetales. Resistentes a bajas temperaturas.',
    image: '/assets/bandas-carne.jpg',
    alt: 'Bandas transportadoras para cárnicos y embutidos',
  },
  {
    id: 'galleteras',
    title: 'BANDAS PARA GALLETERAS, PANADERÍAS Y PASTIFICIOS',
    description:
      'Bandas transportadoras de PVC y PU, sanitarias, aprobadas por la FDA y EU. Poseen flexibilidad en cantos vivos, acabado brillante, mate y tejido. Resistentes a aceites, grasas animales y vegetales.',
    image: '/assets/bandas-panaderia.jpg',
    alt: 'Bandas para galleteras, panaderías y pastificios',
  },
  {
    id: 'azucar',
    title: 'BANDAS PARA AZÚCAR',
    description:
      'Fabricadas en PVC, sanitarias, aprobadas por la FDA y EU, antiestáticas, antillamas, resistentes a la humedad, abrasión. Pueden trabajar en artesa y poseen certificación ATEX.',
    image: '/assets/bandas-azucar.jpg',
    alt: 'Bandas transportadoras para azúcar',
  },
  {
    id: 'elevadora-cangilones',
    title: 'BANDAS ELEVADORA DE CANGILONES',
    description:
      'Bandas transportadoras de PVC, sanitaria, aprobada por la FDA y EU. Posee estructura multicapa que distribuye de manera uniforme el esfuerzo de elevación, reduciendo el estiramiento. Resistente a aceites, grasas animales y vegetales, resistentes a la abrasión.',
    image: '/assets/cangilones-2.jpg',
    alt: 'Bandas elevadoras de cangilones',
  },
  {
    id: 'modulares',
    title: 'BANDAS MODULARES',
    description:
      'Fabricadas en Polipropileno, sanitarias, aprobadas por la FDA y EU. Resistentes a agentes químicos. Mayor durabilidad. Extremadamente livianas, ideales para el transporte alimenticio e industrial.',
    image: '/assets/bandas-modulares.jpg',
    alt: 'Bandas modulares sanitarias',
  },
];

export const INDUSTRIAL_PRODUCTS: ProductCardItem[] = [
  {
    id: 'aeropuertos',
    title: 'BANDAS PARA AEROPUERTOS PAQUETERÍA Y CAMINADORAS',
    description:
      'Bandas transportadoras de PVC que cumplen con las normativas internacionales de seguridad, abrasión, antiestática, antillama, tejido silencioso.',
    image: '/assets/bandas-perfiles.jpg',
    alt: 'Bandas para aeropuertos, paquetería y caminadoras',
  },
  {
    id: 'cangilones-tornillos',
    title: 'CANGILONES Y TORNILLOS',
    description:
      'Cangilones en material Poliamida y Polietileno, en color blanco y verde. Son antiestáticos y tienen gran capacidad de elevación. Los tornillos son fabricados en acero galvanizado, resistentes a la corrosión, con cabeza plana, permitiendo el deslizamiento sin problema sobre los rodillos.',
    image: '/assets/cangilones-500.jpg',
    alt: 'Cangilones y tornillos industriales',
  },
  {
    id: 'mallas-kevlar',
    title: 'MALLAS KEVLAR PARA HORNOS DE TERMOENCOGIBLE',
    description:
      'Utilizadas para el transporte de productos en hornos para plástico termoencogible. Resistentes al calor y a la abrasión. Soportan altas temperaturas.',
    image: '/assets/mallas-kevlar.jpg',
    alt: 'Mallas Kevlar para hornos de termoencogible',
  },
  {
    id: 'cadenas-table-top',
    title: 'CADENAS TABLE TOP',
    description:
      'Fabricadas en acero inoxidable y acetal. Transportan materiales en líneas de producción rectas o curvas.',
    image: '/assets/cadenas-table-top.jpg',
    alt: 'Cadenas Table Top en acero inoxidable y acetal',
  },
  {
    id: 'grapas-flexco',
    title: 'GRAPAS FLEXCO',
    description:
      'Empalmes mecánicos que permiten unir los extremos de las bandas de una forma rápida y sencilla. Fabricadas en acero inoxidable y galvanizado. Disponemos de varios modelos según el espesor de la banda y su aplicación.',
    image: '/assets/grapas-flexco.jpg',
    alt: 'Grapas Flexco para empalmes mecánicos',
  },
  {
    id: 'tela-teflon',
    title: 'TELA DE TEFLON Y SILICONADA',
    description:
      'Se utilizan como aislantes en hornos y para recubrir las resistencias de las selladoras. Tienen excelentes propiedades antiadherentes y resisten altas temperaturas.',
    image: '/assets/tela-teflon.png',
    alt: 'Tela de teflón y siliconada PTFE',
  },
  {
    id: 'bandas-perfiles',
    title: 'BANDAS CON PERFILES',
    description:
      'Bandas transportadoras de PVC blanco, sanitarias y verdes, aprobadas por la FDA y EU. Resistentes a aceites, grasas animales, vegetales, abrasión y corte. Los perfiles se sueldan sobre la superficie portante de la banda en los transportadores inclinados.',
    image: '/assets/banda-perfil-web.jpg',
    alt: 'Bandas transportadoras con perfiles soldados',
  },
  {
    id: 'correas-planas',
    title: 'CORREAS PLANAS DE TRANSMISIÓN DE FUERZA',
    description:
      'Empleadas para accionar 2 poleas. Se encuentran en material de cuero, elastómero y tejido. No requieren tensado de mantenimiento.',
    image: '/assets/correa-trans.jpg',
    alt: 'Correas planas de transmisión de fuerza',
  },
  {
    id: 'cortinas-cava',
    title: 'CORTINAS PLÁSTICAS PARA CAVA CUARTO',
    description:
      'Fabricadas en PVC transparente. Se utilizan en ambientes con temperaturas negativas por su potencia aislante. Son flexibles, resistentes a la rotura y agrietamiento, ya sea para aplicaciones interiores o exteriores.',
    image: '/assets/cortinas-frio.jpg',
    alt: 'Cortinas plásticas de PVC para cava cuarto',
  },
  {
    id: 'soportes-cortinas',
    title: 'SOPORTE PARA INSTALACIÓN DE CORTINAS',
    description:
      'Fabricados en acero inoxidable. Fáciles de instalar y de reemplazar.',
    image: '/assets/cortinas-soportes.jpg',
    alt: 'Soporte en acero inoxidable para instalación de cortinas',
  },
];

export const SERVICIOS_ITEMS: ProductCardItem[] = [
  {
    id: 'vulcanizado-planta',
    title: 'SERVICIO DE VULCANIZADO EN PLANTA',
    description:
      'Ofrecemos servicio de vulcanizado directamente en las máquinas para montar las respectivas bandas en equipos que no se pueden desarmar.',
    image: '/assets/servicio-en-planta.jpg',
    alt: 'Servicio de vulcanizado en planta',
  },
  {
    id: 'vulcanizado-taller',
    title: 'SERVICIO DE VULCANIZADO EN NUESTRO TALLER',
    description:
      'Ofrecemos servicios para empalmar los extremos de las bandas transportadoras de PVC y PU, mediante vulcanizado en caliente.',
    image: '/assets/servicio-en-taller.jpg',
    alt: 'Servicio de vulcanizado en nuestro taller',
  },
];

export const BRAND_PARTNERS = [
  {
    id: 'esbelt',
    name: 'ESBELT',
    image: '/assets/esbelt.png',
    url: 'https://www.esbelt.com/',
    buttonLabel: 'Representantes exclusivos',
  },
  {
    id: 'ave',
    name: 'Transmisiones Mecánicas AVE / Ammeraal Beltech',
    image: '/assets/ave.png',
    url: 'https://www.ammeraalbeltech.com/es-es/',
    buttonLabel: 'Representantes Exclusivos',
  },
  {
    id: 'flexco',
    name: 'FLEXCO',
    image: '/assets/flexco.png',
    url: null,
    buttonLabel: null,
  },
];
