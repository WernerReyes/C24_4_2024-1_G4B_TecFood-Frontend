import type { AvatarProps } from "primereact/avatar";
import { Avatar as AvatarPrimeReact } from "primereact/avatar";
import { AvatarGroup as AvatarGroupPrimeReact } from "primereact/avatargroup";

interface Props extends AvatarProps {}

export const Avatar = (props: Props) => {
  return (
    <AvatarPrimeReact
      {...props}
      pt={{
        ...props.pt,
        image: { className: "h-full w-full" },
      }}
    />
  );
};

export const AvatarGroup = ({ children }: Props) => {
  return <AvatarGroupPrimeReact>{children}</AvatarGroupPrimeReact>;
};
