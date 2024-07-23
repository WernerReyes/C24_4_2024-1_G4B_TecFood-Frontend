import {
  PanelMenuProps,
  PanelMenu as PanelMenuPrimeReact,
} from "primereact/panelmenu";
import clsx from "clsx";

interface Props extends PanelMenuProps {}

export const PanelMenu = ({ ...props }: Props) => {
  return (
    <PanelMenuPrimeReact
      {...props}
      pt={{
        ...props.pt,
        headercontent: {
          className: "bg-transparent",
        },
        panel: {
          className: clsx(
            "dark:border-blue-900/40 text-gray-700 dark:text-white/80  rounded-md transition-shadow duration-200",
            "hover:bg-gray-200 dark:hover:bg-gray-800/80  hover:text-gray-700 dark:hover:text-white/80",
          ),
        },
      }}
    />
  );
};
