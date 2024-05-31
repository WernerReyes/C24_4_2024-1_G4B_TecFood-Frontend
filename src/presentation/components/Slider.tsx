import {
    SliderChangeEvent as SliderChangeEventPrimeReact,
    Slider as SliderPrimeReact,
    SliderProps,
} from "primereact/slider";

export interface SliderChangeEvent extends SliderChangeEventPrimeReact {}

interface Props extends SliderProps {}

export const Slider = ({ ...props }: Props) => {
  return (
    <SliderPrimeReact
      {...props}
      pt={{
        handle: {
          className: " border-2 border-primary rounded-full",
        },
      }}
    />
  );
};
