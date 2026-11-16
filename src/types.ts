export type RoutePath =
  | '/'
  | '/nuestra-historia'
  | '/productos'
  | '/contactus'
  | '/web/login';

export interface ProductCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface HomeMediaItem {
  id: string;
  title: string;
  paragraphs: string[];
  image: string;
  alt: string;
  buttonLabel: string;
  href: string;
  offsetClass: string;
  paddingClass: string;
  roundedPill: boolean;
}
