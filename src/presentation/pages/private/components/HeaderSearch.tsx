import { ChangeEvent, useEffect, useState } from "react";
import { InputSearch } from "@/presentation/core/components";
import { HeaderSearchLayout } from "../layout";
import { useAuthStore, useDishStore } from "@/presentation/hooks";
import type { DishModel } from "@/model";
import { RecommendationSearch, HistorySearch } from "./";
import { getStorage } from "@/presentation/utilities";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const HeaderSearch = ({ visible, setVisible }: Props) => {
  const { isAdmin, isUser } = useAuthStore();
  const {
    dishes,
    startLoadingDishes,
    startLoadingDishesPublished,
    startFilterDishes,
    filters,
  } = useDishStore();
  const [historySearch, setHistorySearch] = useState<
    { id: number; name: string }[]
  >([]);
  const [recommendations, setRecommendations] = useState<DishModel[]>([]);
  const [search, setSearch] = useState<string>("");
  const [enterPressed, setEnterPressed] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search) {
      setRecommendations(filterSearch(dishes, search));
    } else {
      setRecommendations([]);
    }

    setSearch(search);
  };

  useEffect(() => {
    isAdmin && startLoadingDishes();
    isUser && startLoadingDishesPublished();
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
    setVisible(false);
  }, [enterPressed]);

  return (
    <HeaderSearchLayout visible={visible} setVisible={setVisible}>
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
          setEnterPressed={setEnterPressed}
        />
      )}
    </HeaderSearchLayout>
  );
};

const filterSearch = (dishes: DishModel[], search: string) => {
  return dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase()),
  );
};
