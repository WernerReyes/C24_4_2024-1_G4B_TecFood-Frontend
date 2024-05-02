import clsx from "clsx";
import {
  AboutUs,
  DowloadMobileApp,
  Footer,
  Header,
  Main,
  Menu,
  SpecialOffers,
} from "../components";
import { Image } from "@/presentation/components";
import { useTheme } from "@/presentation/hooks";

const marginContainer = "mx-10 lg:mx-20";

export const HomePage = () => {
  const { isDark } = useTheme();
  return (
    <main
      className={clsx(
        "h-full max-h-full min-h-screen w-full",
        isDark ? "bg-gradient-primary-dark" : "bg-gradient-primary",
      )}
    >
      <Header />
      <Main marginContainer={marginContainer} />
      <SpecialOffers marginContainer={marginContainer} />
      <span className="mb-5 mt-0 flex justify-end">
        <Image src="/landing/rosemary.png" width="100" />
      </span>
      <AboutUs marginContainer={marginContainer} />
      <Menu marginContainer={marginContainer} />
      <DowloadMobileApp marginContainer={marginContainer} />
      <Footer />
    </main>
  );
};

export default HomePage;
