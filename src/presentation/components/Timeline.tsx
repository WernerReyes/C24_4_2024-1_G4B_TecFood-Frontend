import {
  Timeline as TimelinePrimeReact,
  type TimelineProps,
} from "primereact/timeline";

interface Props extends TimelineProps {}

export const Timeline = ({ ...props }: Props) => {
  return (
    <TimelinePrimeReact
      {...props}
      pt={{
        ...props.pt,
        opposite: { className: "hidden md:block" },
      }}
    />
  );
};
