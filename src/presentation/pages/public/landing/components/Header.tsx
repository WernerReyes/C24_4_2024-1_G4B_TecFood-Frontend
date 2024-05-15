import { useState } from "react";
import clsx from "clsx";
import { Image, Link } from "@/presentation/components";
import { useTheme, useWindowSize } from "@/presentation/hooks";
import { responsiveDesign } from "@/presentation/utilities";
import { AlertOffers } from "./Alert-offers";
import { PublicRoutes } from "@/presentation/routes";

const { lg: SCREEN_WIDTH_LG, sm: SCREEN_WIDTH_SM } = responsiveDesign;

const DURATION = 700;

export const Header = () => {
  const { isDark } = useTheme();
  const { width } = useWindowSize();
  const [hiddenNavbar, setHiddenNavbar] = useState(true);
  const [activeLink, setActiveLink] = useState("home");

  const handleToggleShowNavbar = () => setHiddenNavbar(!hiddenNavbar);

  return (
    <header className="bg-trasparent sticky left-0 right-0 top-0 z-10 transform bg-opacity-50 font-sans shadow-md backdrop-blur-md backdrop-filter  transition-transform duration-500 dark:shadow-[#fdce7708]">
      <AlertOffers
        title="Get 50% off on your first order."
        subtitle="Available for April 18 - 25"
      />
      <nav
        className={clsx(
          "flex items-center border-b border-gray-200 px-10 py-3",
          "max-sm:min-h-[60px] max-sm:flex-col max-sm:justify-center",
        )}
      >
        <Link to="/home" className={clsx("max-md:w-full")}>
          <Image
            src={clsx(isDark ? "/logo-dark.svg" : "/logo.svg")}
            alt="logo"
            width={width < SCREEN_WIDTH_SM ? "80" : "100"}
          />
        </Link>
        <div
          className={clsx(
            "flex items-center",
            "max-md:ml-auto md:absolute md:right-10",
          )}
        >
          <i className="pi pi-facebook me-5 cursor-pointer text-black hover:text-primary dark:text-white dark:hover:text-primary"></i>
          <i className="pi pi-instagram me-5 cursor-pointer text-black hover:text-primary dark:text-white dark:hover:text-primary"></i>
          <i className="pi pi-linkedin me-5 cursor-pointer text-black hover:text-primary dark:text-white dark:hover:text-primary"></i>
          <div className="inline-block cursor-pointer border-l-2 border-black pl-6 dark:border-gray-300">
            <Link type="router" to={PublicRoutes.LOGIN} unstyled>
              <i className="pi pi-user animate-bounce text-3xl text-black hover:text-primary dark:text-white dark:hover:text-primary"></i>
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex flex-wrap overflow-x-auto px-10 py-3.5">
        <div className={clsx("ml-auto flex", "lg:order-1 lg:hidden")}>
          <button onClick={handleToggleShowNavbar}>
            <i className="pi pi-align-justify text-2xl text-black hover:text-primary dark:text-white dark:hover:text-primary"></i>
          </button>
        </div>
        <ul
          className={clsx(
            "w-full",
            "justify-center max-lg:mt-2 max-lg:space-y-3 lg:!flex lg:space-x-10",
            hiddenNavbar && "max-lg:hidden",
          )}
        >
          <LinkHeader
            label="Home"
            href="home"
            active={activeLink === "home"}
            setActiveLink={setActiveLink}
            width={width}
          />
          <LinkHeader
            label="Today special offers"
            href="special-offers"
            active={activeLink === "special-offers"}
            setActiveLink={setActiveLink}
            width={width}
          />
          <LinkHeader
            label="Why TecFood"
            href="about-us"
            active={activeLink === "about-us"}
            setActiveLink={setActiveLink}
            width={width}
          />
          <LinkHeader
            label="Our Menu"
            href="our-menu"
            active={activeLink === "our-menu"}
            setActiveLink={setActiveLink}
            width={width}
          />
          <LinkHeader
            label="Dowload Mobile App"
            href="dowload-mobile-app"
            active={activeLink === "dowload-mobile-app"}
            setActiveLink={setActiveLink}
            width={width}
          />
        </ul>
      </div>
    </header>
  );
};

const LinkHeader = ({
  label,
  active,
  href,
  setActiveLink,
  width,
}: {
  label: string;
  active: boolean;
  href: string;
  setActiveLink: (href: string) => void;
  width: number;
}) => {
  const [isSpying, setIsSpying] = useState(true);

  const handleSetActive = () => setActiveLink(href);

  const handleClick = () => {
    setIsSpying(false);

    setTimeout(() => {
      setIsSpying(true);
      handleSetActive();
    }, DURATION);
  };

  return (
    <li
      className={clsx(
        "cursor-pointer pl-3 hover:bg-primary/5 dark:hover:bg-[#fdce770f]",
        "max-sm:py-1",
        "max-lg:border-b max-lg:py-2",
      )}
    >
      <Link
        activeClass="active"
        to={href}
        spy={isSpying}
        smooth
        offset={width < SCREEN_WIDTH_LG ? -460 : -200}
        duration={DURATION}
        className={clsx(
          "block text-[15px] font-bold",
          active ? "text-[#007bff]" : "text-black dark:text-slate-200",
        )}
        onSetActive={handleSetActive}
        onClick={handleClick}
        unstyled
        type="scroll"
      >
        {label}
      </Link>
    </li>
  );
};
