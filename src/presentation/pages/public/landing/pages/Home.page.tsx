import { Image } from "@/presentation/components";
import {
  AboutUs,
  DowloadMobileApp,
  Footer,
  Header,
  Main,
  Menu,
  SpecialOffers,
} from "../components";
import { useWindowSize } from "@/presentation/hooks";
import { responsiveDesign } from "@/presentation/utilities";
import { ThemeLayout } from "@/presentation/layout";

const { lg: SCREEN_WIDTH_LG } = responsiveDesign;

const marginContainer = "mx-10 lg:mx-20";

export const HomePage = () => {
  const { width } = useWindowSize();
  return (
    <ThemeLayout
      offset={width < SCREEN_WIDTH_LG ? -460 : -200}
      to="home"
      colorTheme="bg-gradient-primary dark:bg-gradient-primary-dark"
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
    </ThemeLayout>
  );
};

export default HomePage;
