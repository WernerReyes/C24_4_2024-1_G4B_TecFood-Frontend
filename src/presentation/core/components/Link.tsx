import { Link as LinkReactRouter } from "react-router-dom";
import { Link as LinkReactScroll } from "react-scroll";
import type { LinkProps } from "react-scroll";
import clsx from "clsx";

type LinkType = "scroll" | "router";

interface Props extends LinkProps {
  type?: LinkType;
  unstyled?: boolean;
}

interface LinkChildrenProps extends Omit<Props, "type"> {}

const classNameDefault = "px-4 py-2 text-black font-medium rounded-full";

export const Link = ({
  type = "router",
  className,
  unstyled,
  ...props
}: Props) => {
  
  return (
    <>
      {type === "router" ? (
        <LinkRouter
          {...props}
          className={clsx(!unstyled && classNameDefault, className)}
        />
      ) : (
        <LinkScroll
          {...props}
          className={clsx(!unstyled && classNameDefault, className)}
        />
      )}
    </>
  );
};

const LinkRouter = ({ to, label, className, children }: LinkChildrenProps) => {
  return (
    <LinkReactRouter to={to} className={className}>
      {label}
      {children}
    </LinkReactRouter>
  );
};

const LinkScroll = ({
  to,
  label,
  className,
  children,
  duration,
  offset,
  activeClass,
  spy,
  onSetActive,
  onClick,
}: LinkChildrenProps) => {
  return (
    <LinkReactScroll
      activeClass={activeClass}
      to={to}
      spy={spy}
      smooth
      duration={duration}
      className={className}
      offset={offset}
      onSetActive={onSetActive}
      onClick={onClick}
    >
      {label}
      {children}
    </LinkReactScroll>
  );
};
