import { InputText } from "primereact/inputtext";
import clsx from "clsx";
import { Button as ButtonPrimerReact } from "primereact/button";
import { Button, Image } from "@/presentation/components";

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
        <div className={clsx("mt-5 flex w-full items-center", "md:w-3/4")}>
          <div
            className={clsx(
              "p-inputgroup ml-auto max-h-12 min-h-12 max-w-sm flex-1 rounded-full border-2 p-2",
              "md:me-4",
            )}
          >
            <ButtonPrimerReact
              icon="pi pi-search"
              className="bg-transparent text-black dark:text-white"
            />
            <InputText
              placeholder="Keyword"
              className="bg-transparent text-black shadow-none dark:text-white"
            />
          </div>
          <span
            className={clsx(
              "pi pi-search me-auto ml-5 cursor-pointer rounded-full bg-[#FDCE77] p-3.5 text-black",
              "md:ml-0",
            )}
          ></span>
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
            <span className="pi pi-play bg-trasparent cursor-pointer rounded-full p-3.5 text-primary shadow-md shadow-amber-400"></span>
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
