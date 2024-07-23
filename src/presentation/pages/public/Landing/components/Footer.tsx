import clsx from "clsx";
import { Button, InputText } from "@/presentation/core/components";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer
      className={clsx(
        "mt-5 grid grid-cols-2 grid-rows-3 items-start gap-x-5 bg-white p-10 pb-5 text-xs text-white dark:bg-black",
        "sm:text-sm",
        "md:mt-0 md:grid-cols-6 md:grid-rows-1 md:gap-x-10 md:p-20 md:pb-5",
      )}
    >
      <div className={clsx("col-span-2", "md:col-span-2")}>
        <h2 className={clsx("text-xl font-bold text-primary", "sm:text-2xl")}>
          Tecfood
        </h2>
        <p className="font-medium text-black dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In ratione
          necessitatibus sequi maiores harum mollitia, repellendus vitae,
          sapiente unde iure nemo quaerat minus iusto asperiores, voluptates
          consectetur sunt! Consectetur, labore!
        </p>
        <div className="mt-5 text-[#FDCE77]">
          <i className="pi pi-facebook"></i>
          <i className="pi pi-instagram mx-5"></i>
          <i className="pi pi-twitter"></i>
        </div>
      </div>
      <div
        className={clsx(
          "mt-5 text-black dark:text-white",
          "md:mt-0 md:justify-self-center",
        )}
      >
        <h2 className={clsx("text-xl font-bold text-primary", "sm:text-2xl")}>
          About us
        </h2>
        <ul className="mt-3">
          <li className="mb-2 text-sm">About us</li>
          <li className="mb-2 text-sm">Services</li>
          <li className="mb-2 text-sm">Contact</li>
          <li className="mb-2 text-sm">Company</li>
        </ul>
      </div>
      <div
        className={clsx(
          "mt-5 text-black dark:text-white",
          "md:mt-0 md:justify-self-center",
        )}
      >
        <h2 className={clsx("text-xl font-bold text-primary", "sm:text-2xl")}>
          Company
        </h2>
        <ul className="mt-3">
          <li className="mb-2 text-sm">Parnership</li>
          <li className="mb-2 text-sm">Terms of used</li>
          <li className="mb-2 text-sm">Privacy</li>
          <li className="mb-2 text-sm">Sitemap</li>
        </ul>
      </div>
      <div className={clsx("col-span-2 mt-5", "md:col-span-2 md:mt-0")}>
        <h2 className={clsx("text-xl font-bold text-primary", "sm:text-2xl")}>
          Get in touch
        </h2>
        <p className="mt-3 text-sm text-black dark:text-white">
          1234 Street Name, City Name, United States
        </p>
        <div
          className={clsx(
            "mt-5 flex w-full",
            "md:flex-col md:justify-start",
            "lg:flex-row",
          )}
        >
          <InputText
            type="email"
            placeholder="Email"
            className={clsx(
              "min-w-40 max-w-40 rounded-3xl border-none bg-[#e8e8e8] pl-4 text-black dark:bg-gray-700 dark:text-white",
              "md:mb-4 md:w-full md:max-w-full md:p-2 md:pl-4",
              "lg:min-w-40 lg:max-w-40 lg:pl-4",
            )}
          />
          <Button
            label="Subscribe"
            className={clsx("ml-3", "md:ml-0 md:w-full", "lg:ml-3 lg:h-10")}
          />
        </div>
      </div>
      <div
        className={clsx(
          "col-span-2 mt-5 text-center text-xl text-black dark:text-white",
          "md:col-span-6 md:mb-0 md:mt-10",
        )}
      >
        <p>© {currentYear} Foodhut.</p>
      </div>
    </footer>
  );
};
