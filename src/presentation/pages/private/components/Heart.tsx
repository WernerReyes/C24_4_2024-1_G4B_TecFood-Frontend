import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/presentation/core/components";

const ICON_DEFAULT_CLASSNAME =
  "relative z-10 cursor-pointer text-2xl transition-all hover:text-red-500";

type Props = {
  className?: string;
  iconClassName?: string;
  unstyled?: boolean;
};

export const Heart = ({ iconClassName, className, unstyled }: Props) => {
  const [heart, setHeart] = useState<string>("pi pi-heart");
  return (
    <Button
     className={className}
      onMouseEnter={() => setHeart("pi pi-heart-fill")}
      onMouseLeave={() => setHeart("pi pi-heart")}
      unstyled
    >
      <i
        className={clsx(
          heart,
          iconClassName,
          unstyled ? "" : ICON_DEFAULT_CLASSNAME,
        )}
      ></i>
    </Button>
  );
};
