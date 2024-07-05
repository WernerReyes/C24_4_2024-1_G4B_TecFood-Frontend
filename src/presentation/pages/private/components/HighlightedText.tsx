import { ReactElement } from "react";
import clsx from "clsx";

type Props = {
  text: string;
  highlight: string;
  selected?: string;
};

export const HighlightedText = ({
  text,
  highlight,
  selected,
}: Props): ReactElement => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={i}
            className={clsx(
              "text-primary",
              selected === text &&
                "text-white underline underline-offset-2 group-hover:text-white dark:text-black  dark:group-hover:text-black",
            )}
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
};
