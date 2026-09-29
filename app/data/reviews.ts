import { siteInfo } from '#shared/utils/seo';

export type CustomerReview = {
  author: string;
  text: string;
  url: string;
};

// Google review text and public author names supplied by the site owner.
// Ratings were not supplied; do not infer stars or an aggregate score.
export const customerReviews: CustomerReview[] = [
  {
    author: 'Uriel Benito',
    text: 'los burritos de pac están 10/10, los probé el otro día y quedé loco. la masa fresca y le pone bastante relleno, no te deja nada que desear. denle una oportunidad, vale la pena 👏🏻👏🏻',
    url: siteInfo.googleReviews,
  },
  {
    author: 'Didier Latreille',
    text: 'Una locura los burritos. Los mejores de zona norte por afano.\nEl korean bbq chicken de mis preferidos\nBuena cantidad de relleno. Muy bien la coccion, una maravilla todo.\nQue bueno sos armando, te felicito Pac.',
    url: siteInfo.googleReviews,
  },
  {
    author: 'Santiago Agnoletti',
    text: 'Señores burritos, bombas de sabor mal y super abundantes en relación al precio, de lo mejor que probé, obvio que voy a volver a pedir',
    url: siteInfo.googleReviews,
  },
  {
    author: 'panda010',
    text: 'Mamita, no me daban los dedos para chuparlos de lo rico que estaba el burrito, 10de10',
    url: siteInfo.googleReviews,
  },
];
