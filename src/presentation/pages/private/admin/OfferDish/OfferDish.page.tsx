import { useEffect, useState } from "react";
import { AdminLayout } from "../layout";
import { useDishStore } from "@/presentation/hooks";
import {
  PickList,
  type PickListChangeEvent,
} from "@/presentation/core/components";
import type { DishModel } from "@/model";
import { StatusEnum } from "@/domain/entities/enums";
import { OffertDialog, PickListItem } from "./components";

const OfferDishPage = () => {
  const { dishes } = useDishStore();
  const [dishesToChoose, setDishesToChoose] = useState<DishModel[]>([]);
  const [offeredDishes, setOfferedDishes] = useState<DishModel[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const onChange = (event: PickListChangeEvent) => {
    setDishesToChoose(event.source);
    setOfferedDishes(event.target);
  };

  useEffect(() => {
    const dishesPublished = dishes.filter(
      (dish) => dish.status === StatusEnum.PUBLISHED,
    );
    setDishesToChoose(dishesPublished.filter((dish) => !dish.discountPrice));
    setOfferedDishes(dishesPublished.filter((dish) => dish.discountPrice));
  }, [dishes]);

  return (
    <AdminLayout>
      <PickList
        className="-z-50 mx-10 mt-10"
        dataKey="id"
        source={dishesToChoose}
        target={offeredDishes}
        onChange={onChange}
        // onMoveToSource={(e) => e.originalEvent.preventDefault()}
        filter
        sourceItemTemplate={(item) => (
          <PickListItem
            type="source"
            dish={item}
            setOpenDialog={setOpenDialog}
          />
        )}
        targetItemTemplate={(item) => (
          <PickListItem
            type="target"
            dish={item}
            setOpenDialog={setOpenDialog}
          />
        )}
        showSourceControls={false}
        targetSelection={false}
        showTargetControls={false}
        filterBy="name"
        breakpoint="1280px"
        sourceHeader="Dishes"
        targetHeader="Offered Dishes"
        sourceStyle={{ height: "24rem" }}
        targetStyle={{ height: "24rem" }}
        sourceFilterPlaceholder="Search by name"
        targetFilterPlaceholder="Search by name"
      />

      <OffertDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </AdminLayout>
  );
};

export default OfferDishPage;
