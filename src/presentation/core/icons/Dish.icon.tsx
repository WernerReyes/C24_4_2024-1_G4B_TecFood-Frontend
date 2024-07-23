type Props = {
  className?: string;
};

export const DishIcon = ({ className }: Props) => {
  return (
    <i className={className}>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path>
        <path d="M7 21h10"></path>
        <path d="M19.5 12 22 6"></path>
      </svg>
    </i>
  );
};
