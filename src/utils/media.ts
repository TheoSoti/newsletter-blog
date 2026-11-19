// Some short heroes are videos, which cannot be used as og:image or schema image.
export const isImagePath = (path?: string): path is string => !!path && /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(path);
