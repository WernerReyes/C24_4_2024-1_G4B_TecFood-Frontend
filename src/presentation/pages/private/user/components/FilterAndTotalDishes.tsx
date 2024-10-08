import { Button } from "@/presentation/core/components";
import { FilterIcon } from "@/presentation/core/icons";
import { useDishStore } from "@/presentation/hooks";

type Props = {
  setVisbleSidebar: (value: boolean) => void;
};

export const FilterAndTotalDishes = ({ setVisbleSidebar }: Props) => {
  const { total } = useDishStore();
  return (
    <section className="m-0 mb-5 flex items-center justify-between p-0">
      <Button
        className="lg:hidden"
        icon={<FilterIcon />}
        iconPos="left"
        label="Filter"
        onClick={() => setVisbleSidebar(true)}
      />
      <p className="text-lg">{total} dishes found</p>
    </section>
  );
};
