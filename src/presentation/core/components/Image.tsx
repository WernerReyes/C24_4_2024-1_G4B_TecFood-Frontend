import type { ImageProps } from "primereact/image";
import { Image as ImagePrimeReact } from "primereact/image";

interface Props extends ImageProps {}

export const Image = ({ ...props }: Props) => {
  return <ImagePrimeReact {...props} />;
};
