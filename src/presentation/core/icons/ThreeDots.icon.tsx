import React from "react";
type Props = {
  className?: string;
  iconProps?: React.SVGProps<SVGSVGElement>;
};

export const ThreeDotsIcon = ({ className, iconProps }: Props) => {
  return (
    <i
      className={
        "cursor-pointer text-gray-700 hover:text-gray-500 dark:text-white " +
        className
      }
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
        {...iconProps}
      >
        <path d="M6.25 10a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm5 0a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM15 11.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"></path>
      </svg>
    </i>
  );
};
