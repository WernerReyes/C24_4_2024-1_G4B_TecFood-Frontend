type Props = {
  className?: string;
  iconProps?: React.SVGProps<SVGSVGElement>;
};

export const FilterIcon = ({ className, iconProps }: Props) => {
  return (
    <i className={className}>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height={20}
        width={20}
        {...iconProps}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 7h-9"></path>
        <path d="M14 17H5"></path>
        <circle cx="17" cy="17" r="3"></circle>
        <circle cx="7" cy="7" r="3"></circle>
      </svg>
    </i>
  );
};

