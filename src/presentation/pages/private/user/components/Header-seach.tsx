import { ChangeEvent, useEffect, useState } from "react";
import { InputSearch } from "@/presentation/components";
import { HeaderSeachLayout } from "../../layout";
import { useDishStore } from "@/presentation/hooks";
import { DishModel } from "@/model";
import { RecommendationSearch } from "./Recommendation-search";
import { getStorage } from "@/presentation/utilities";
import { HistorySearch } from "./History-search";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const HeaderSeach = ({ visible, setVisible }: Props) => {
  const {
    dishesToSearch,
    startLoadingDishesToSearch,
    startFilterDishes,
    filters,
  } = useDishStore();
  const [historySearch, setHistorySearch] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<DishModel[]>([]);
  const [search, setSearch] = useState<string>("");
  const [enterPressed, setEnterPressed] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search) {
      setRecommendations(filterSearch(dishesToSearch, search));
    } else {
      setRecommendations([]);
    }

    setSearch(search);
  };

  useEffect(() => {
    startLoadingDishesToSearch();
  }, []);

  useEffect(() => {
    if (!visible) {
      setRecommendations([]);
      setSearch("");
    }
  }, [visible]);

  useEffect(() => {
    startFilterDishes({
      ...filters,
      search,
    });
    setHistorySearch(getStorage("historySearch") || []);
    setEnterPressed(false);
  }, [enterPressed]);

  return (
    <HeaderSeachLayout visible={visible} setVisible={setVisible}>
      <InputSearch
        iconPosition="left"
        iconClassName="cursor-auto"
        placeholder="Search a dish"
        className="py-4"
        onChange={handleSearch}
        enterKeyHint="search"
      />
      {recommendations.length ? (
        <RecommendationSearch
          recommendations={recommendations}
          setEnterPressed={setEnterPressed}
          historySearch={historySearch}
          search={search}
        />
      ) : (
        <HistorySearch
          histories={historySearch}
          setHistorySearch={setHistorySearch}
        />
      )}
    </HeaderSeachLayout>
  );
};

const filterSearch = (dishes: DishModel[], search: string) => {
  return dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase()),
  );
};
