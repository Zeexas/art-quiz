function importAll(r) {
  return r.keys().map(r);
}

export const cropImageSet = importAll(
  require.context('./assets/img/crop', false, /\.(png|jpe?g|svg|webp)$/)
);
export const fullImageSet = importAll(
  require.context('./assets/img/full', false, /\.(png|jpe?g|svg|webp)$/)
);
export const svgImageSet = importAll(
  require.context('./assets/img/svg', false, /\.(png|jpe?g|svg|webp)$/)
);

// console.log(cropImageSet)
