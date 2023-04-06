export const getPrice = ({ modelos, plancha, cuero, gomas, puntera, plantarmar, plantinterna, forro, lenguetacuero, aleteado }) => {
  const cleanString = string => {
    if (typeof string === 'string') return string?.toLowerCase();
  };

  const prices = {
    303: 126,
    405: 141,
    510: 140,
    360: 152,
    chocolatera: 174,
    vestir: 121,
    407: 141,
  };
  let basePrice = prices[modelos?.toLowerCase()];

  // plancha
  if (plancha) basePrice += 20;
  // cuero
  if (cleanString(cuero) === 'graso') {
    if (modelos.toLowerCase() === 'chocolatera') basePrice += 4.8;
    basePrice += 8;
  }
  if (cleanString(cuero) === 'graso industrial') {
    if (modelos.toLowerCase() === 'chocolatera') basePrice += 7.2;
    basePrice += 12;
  }
  if (cleanString(cuero) === 'hunting') {
    if (modelos.toLowerCase() === 'chocolatera') basePrice += 4.8;
    basePrice += 8;
  }
  if (cleanString(cuero) === 'volcado') {
    if (modelos.toLowerCase() === 'chocolatera') basePrice += 6;
    basePrice += 6;
  }
  if (cleanString(cuero) === 'nobuck') {
    if (modelos.toLowerCase() === 'chocolatera') basePrice += 9;
    basePrice += 15;
  }
  // gomas
  if (cleanString(gomas) === 'motalvo mik') basePrice += 6;
  if (cleanString(gomas) === 'explorer color') basePrice += 6;
  if (cleanString(gomas) === 'cat guigar') basePrice += 8.5;
  if (cleanString(gomas) === 'vestir amazonas') basePrice += 6;
  if (cleanString(gomas) === 'dragon guigar') basePrice += 2;
  if (cleanString(gomas) === 'dragon guigar color') basePrice += 9.5;
  // puntera
  if (cleanString(puntera) === 'composite') basePrice += 15;
  if (cleanString(puntera) === 'termoplastica') basePrice -= 6;
  // plantilla armar
  if (cleanString(plantarmar) === 'fibra') basePrice -= 6;
  if (cleanString(plantarmar) === 'plantex') basePrice -= 6;
  // forro
  if (cleanString(forro) === 'cuero') {
    if (modelos.toLowerCase() === 'chocolatera') basePrice += 3;
    basePrice += 4;
  }
  if (cleanString(forro) === 's/forro') {
    if (modelos.toLowerCase() === 'chocolatera') basePrice -= 2;
    basePrice -= 5;
  }
  // plantilla interna
  if (cleanString(plantinterna) === 'castor') basePrice += 6;
  if (cleanString(plantinterna) === 'cuero') basePrice += 9;
  if (cleanString(plantinterna) === 'poliuretano') basePrice += 8;
  if (cleanString(modelos) === 'otro') basePrice = 0;
  if (lenguetacuero) basePrice += 5;
  if (aleteado) basePrice += 5;

  return basePrice;
};
