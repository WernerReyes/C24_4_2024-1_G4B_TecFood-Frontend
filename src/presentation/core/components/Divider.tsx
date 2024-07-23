import clsx from "clsx";

interface Props {
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
  className?: string;
}

const baseStyle = "flex-grow border-gray-300";

export const Divider = ({ align = "center", children, className }: Props) => {
  return (
    <section className={clsx("flex items-center text-center", className)}>
      {align === "start" && <DividerStart>{children}</DividerStart>}
      {align === "center" && <DividerCenter>{children}</DividerCenter>}
      {align === "end" && <DividerEnd>{children}</DividerEnd>}
    </section>
  );
};

const DividerStart = ({ children }: Props) => {
  return (
    <>
      {children}
      <hr className={baseStyle} />
      <hr className={baseStyle} />
    </>
  );
};

const DividerCenter = ({ children }: Props) => {
  return (
    <>
      <hr className={baseStyle} />
      {children}
      <hr className={baseStyle} />
    </>
  );
};

const DividerEnd = ({ children }: Props) => {
  return (
    <>
      <hr className={baseStyle} />
      <hr className={baseStyle} />
      {children}
    </>
  );
};
