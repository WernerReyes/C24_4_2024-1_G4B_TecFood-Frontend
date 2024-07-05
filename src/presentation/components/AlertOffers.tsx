import clsx from "clsx";

type Props = {
  title: string;
  subtitle: string;
};

export const AlertOffers = ({ title, subtitle }: Props) => {
  return (
    <section className="bg-primary p-1 text-center text-white">
      <p
        className={clsx(
          "inline text-sm font-bold text-black dark:text-white",
          "sm:text-lg",
        )}
      >
        {title}{" "}
        <span
          className={clsx("block text-xs font-normal", "sm:inline sm:text-sm")}
        >
          {subtitle}
        </span>
      </p>
    </section>
  );
};
