export const getDetail = product => {
  const properties = [];
  for (const key in product) {
    if (Object.hasOwnProperty.call(product, key)) {
      const valor = product[key];
      if (
        key === 'cuero' ||
        key === 'goma' ||
        key === 'forro' ||
        key === 'costra' ||
        key === 'acero' ||
        key === 'aleteado' ||
        key === 'plantillaAcero' ||
        key === 'plantillaPoliuretano' ||
        key === 'adicional'
      ) {
        if (valor) properties.push({ title: key, value: valor });
      }
    }
  }
  return properties;
};
