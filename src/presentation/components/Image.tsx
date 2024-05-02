import { Image as ImagePrimeReact } from "primereact/image";
import type { ImageProps } from "primereact/image";

interface Props extends ImageProps {}

export const Image = (props: Props) => {
  return (
    <div className="justify-content-center flex">
      <ImagePrimeReact {...props} />
    </div>
  );
};
