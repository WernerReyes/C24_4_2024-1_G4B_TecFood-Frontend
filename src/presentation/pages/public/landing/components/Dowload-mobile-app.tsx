import clsx from "clsx";
import { Image, Button } from "@/presentation/components";

type Props = {
  marginContainer: string;
};

export const DowloadMobileApp = ({ marginContainer }: Props) => {
  return (
    <section
      id="dowload-mobile-app"
      className={clsx(
        "mt-10 grid items-center justify-items-start gap-x-10 text-xs",
        "sm:text-sm",
        "md:grid-cols-2",
        marginContainer,
      )}
    >
      <div className={clsx("order-2", "md:order-1")}>
        <h2 className={clsx("text-2xl font-extrabold", "sm:text-3xl")}>
          <span className="text-black dark:text-white">It's Now </span>
          <span className="text-primary">More Easy </span>
          <span className="text-black dark:text-white">To </span>
          <span className="text-secondary">Order </span>
          <span className="text-black dark:text-white">By our Mobile </span>
          <span className="text-primary">App</span>
        </h2>
        <p className="mt-4 dark:text-slate-300">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
          voluptatem pariatur fugit aperiam. Architecto ratione culpa quo,
          distinctio quibusdam aliquid, libero laboriosam perferendis quae fugit
          praesentium sapiente necessitatibus cumque error.
        </p>
        <div className="flex">
          <Button className="mt-5 rounded-md bg-slate-950 text-white dark:bg-white dark:text-black">
            <Image
              src="/landing/icons/google-play.png"
              alt="play store"
              width="40"
            />
            <div className="flex flex-col">
              <span className="text-xs uppercase ">Get it on</span>
              <span className="text-sm font-bold"> Google Play</span>
            </div>
          </Button>
        </div>
      </div>
      <div
        className={clsx(
          "order-1 flex w-full justify-center",
          "md:order-2 md:flex-wrap",
        )}
      >
        <Image
          src="/landing/dowload-mobile-app.png"
          alt="mobile-app"
          className="drop-shadow-primary dark:drop-shadow-primary-dark"
          width="500"
        />
      </div>
    </section>
  );
};
