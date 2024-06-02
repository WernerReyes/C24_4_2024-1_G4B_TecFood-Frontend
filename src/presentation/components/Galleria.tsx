import {
  GalleriaProps,
  Galleria as GalleriaPrimeReact,
  GalleriaResponsiveOptions as GalleriaResponsiveOptionsPrimeReact,
} from "primereact/galleria";

export interface GalleriaResponsiveOptions
  extends GalleriaResponsiveOptionsPrimeReact {}

interface Props extends GalleriaProps {}

export const Galleria = ({ ...props }: Props) => {
  return <GalleriaPrimeReact {...props} />;
};
