import {
  Galleria as GalleriaPrimeReact,
  type GalleriaProps,
  type GalleriaResponsiveOptions as GalleriaResponsiveOptionsPrimeReact,
} from "primereact/galleria";
import { breakPointsGallery } from "../utilities";

export interface GalleriaResponsiveOptions
  extends GalleriaResponsiveOptionsPrimeReact {}

interface Props extends GalleriaProps {}

export const Galleria = ({ ...props }: Props) => {
  return (
    <GalleriaPrimeReact {...props} responsiveOptions={breakPointsGallery} />
  );
};
