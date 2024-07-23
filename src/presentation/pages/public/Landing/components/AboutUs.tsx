import clsx from "clsx";
import { Link, Image } from "@/presentation/core/components";

type Props = {
  marginContainer: string;
};

export const AboutUs = ({ marginContainer }: Props) => {
  return (
    <section
      id="about-us"
      className={clsx(
        "grid items-center justify-items-start text-xs",
        "sm:text-sm",
        "md:grid-cols-2",
        marginContainer,
      )}
    >
      <div
        className={clsx("order-1 flex w-full justify-center", "md:flex-wrap")}
      >
        <Image
          src="/landing/about-us.png"
          alt="mobile-app"
          className="drop-shadow-primary dark:drop-shadow-primary-dark"
          width="500"
        />
      </div>
      <div className="order-2">
        <h2 className={clsx("text-2xl font-extrabold", "sm:text-3xl")}>
          <span className="text-black dark:text-white">We are</span>
          <span className="text-primary"> more</span>
          <span className="text-black dark:text-white"> than</span>
          <span className="text-secondary"> multiple</span>
          <span className="text-black dark:text-white"> service</span>
        </h2>
        <p className="mt-4 text-black dark:text-slate-200">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
          neque quo ad impedit explicabo optio dolores, magnam asperiores aut
          nobis perferendis atque voluptatibus debitis illo. Quasi
          exercitationem eius provident explicabo?
        </p>
        <div
          className={clsx("mt-4 grid grid-rows-2 gap-y-3", "sm:grid-cols-2")}
        >
          <IconText icon="order-online" text="Online Order" />
          <IconText icon="time-service" text="24/7 Service" />
          <IconText icon="reservation" text="Reservation" />
          <IconText icon="chef" text="Super Chef" />
        </div>
        <div className="mt-10">
          <Link
            to="/about-us"
            label="About us"
            className="col-span-2 bg-primary"
          />
        </div>
      </div>
    </section>
  );
};

const IconText = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div className="flex items-center">
      <span className="h-10 w-10 rounded-full bg-primary">
        <Image src={`/landing/icons/${icon}.png`} />
      </span>
      <p className="ml-2 text-black dark:text-white">{text}</p>
    </div>
  );
};
