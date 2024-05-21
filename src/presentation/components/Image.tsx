import type { ImageProps } from "primereact/image";
import { Image as ImagePrimeReact } from "primereact/image";

interface Props extends ImageProps {
  handleLoaded?: () => void;
}

export const Image = ({ handleLoaded, ...props }: Props) => {
  return <ImagePrimeReact {...props} onLoad={handleLoaded} />;
};
