import type { ImageLoader } from "next/image";

// Header and footer logos are shown at 208px wide or less, so each has two lossless PNG copies
// beside the full-size original: 212px for 1x screens and 416px for 2x and up. Serving them
// directly skips the optimizer's lossy re-encoding, which would change the colours.
export const logoImageSize = { width: 212, height: 28 };

export const logoLoader: ImageLoader = ({ src, width }) => src.replace(/\.png$/, width <= logoImageSize.width * 1.25 ? "-212.png" : "-416.png");
