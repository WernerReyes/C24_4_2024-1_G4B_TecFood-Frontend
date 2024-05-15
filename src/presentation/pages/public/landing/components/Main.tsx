import clsx from "clsx";
import { Button, Image, InputSearch } from "@/presentation/components";

type Props = {
  marginContainer: string;
};

export const Main = ({ marginContainer }: Props) => {
  return (
    <main
      id="home"
      className={clsx(
        "mt-10 grid grid-cols-1 text-xs",
        "sm:text-sm",
        "md:grid-cols-2",
        marginContainer,
      )}
    >
      <section
        className={clsx(
          "order-2 mt-10 flex flex-col content-end items-center justify-center",
          "md:order-1 md:mt-0",
        )}
      >
        <h2
          className={clsx("text-center text-4xl font-extrabold", "sm:text-6xl")}
        >
          <span className="dark:text-white">We're</span>
          <span className="text-primary"> Serious</span>
          <span className="dark:text-white"> For</span>
          <span className="text-primary"> Food</span>
          <span className="dark:text-white"> &</span>
          <span className="text-secondary underline decoration-primary decoration-4">
            {" "}
            Delivery
          </span>
          <span className="dark:text-white">.</span>
        </h2>
        <p className={clsx("mt-5 dark:text-slate-200")}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem hic
          praesentium et quasi vero corporis consequuntur, laboriosam
          perferendis sit maiores quae? Ex recusandae, autem quas iusto non
          omnis assumenda fugit?
        </p>
        <div
          className={clsx("mt-5 flex w-full items-center", "md:justify-center")}
        >
          <div className="flex">
            <InputSearch
              className={clsx(
                "ml-auto max-h-12 min-h-12 max-w-sm flex-1 rounded-full border-2 bg-transparent p-2",
                "md:me-4",
              )}
              placeholder="Keyword"
              iconPosition="left"
              iconClassName="text-black dark:text-white"
              unstyled
            />

            <Button
              icon="pi pi-search"
              className={clsx(
                "me-auto ml-5 cursor-pointer bg-secondary p-3.5 text-black",
              )}
            />
          </div>
        </div>
        <div className="mt-5 flex w-full items-center justify-evenly ">
          <Button
            label="Downlode App"
            className={clsx("xs:text-sm", "sm:text-md")}
          />
          <div
            className={clsx(
              "text-center",
              "lg:flex lg:items-center lg:justify-center",
            )}
          >
            <Button
              icon="pi pi-play"
              className={clsx(
                "h-10 w-10 bg-transparent text-primary shadow-md shadow-amber-400",
                "sm:h-12 sm:w-12",
              )}
            />
            <p className={clsx("ml-4 mt-2 dark:text-slate-200", "lg:mt-0")}>
              Whatch the video
            </p>
          </div>
        </div>
      </section>
      <section
        className={clsx(
          "order-1 flex w-full items-center justify-center",
          "md:order-2",
          "lg:justify-end",
        )}
      >
        <Image
          width="520"
          src="landing/main.png"
          alt="landing"
          className=" animate-float drop-shadow-primary dark:drop-shadow-primary-dark"
        />
      </section>
    </main>
  );
};
