import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTheme } from "../hooks";
import { Button, Link } from "./";

type Props = {
  to: string;
  offset: number;
  duration: number;
};

export const ChangeTheme = ({ to, offset, duration }: Props) => {
  const { currentTheme, startChangingTheme, startLoadTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleChangeTheme = () => startChangingTheme(currentTheme);

  useEffect(() => {
    startLoadTheme(currentTheme);
  }, []);

  return (
    <div
      className="absolute bottom-10 end-5 z-10 flex flex-col items-center rounded-full bg-primary/25 lg:bottom-5"
      style={{ position: "fixed" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <Button
          unstyled
          className="z-10 flex h-8 w-8 items-center justify-center transition-all duration-500"
        >
          <Link
            activeClass="active"
            to={to}
            spy
            smooth
            offset={offset}
            duration={duration}
            type="scroll"
            className="transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            <i className="pi pi-angle-up text-primary"></i>
          </Link>
        </Button>
      )}
      <Button
        unstyled
        onClick={handleChangeTheme}
        className="z-20 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
      >
        <i
          className={clsx("pi", currentTheme === "dark" ? "pi-moon" : "pi-sun")}
        ></i>
      </Button>
    </div>
  );
};
