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
  const { dishes, startDeletingManyDishOffers } = useDishStore();
  const [dishesToChoose, setDishesToChoose] = useState<DishModel[]>([]);
  const [offeredDishes, setOfferedDishes] = useState<DishModel[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [removeOfferedDish, setRemoveOfferedDish] = useState<boolean>(false);
  const [pendingEvent, setPendingEvent] = useState<PickListChangeEvent>();

  const handleChange = (e: PickListChangeEvent) => setPendingEvent(e);

  useEffect(() => {
    const dishesPublished = dishes.filter(
      (dish) => dish.status === StatusEnum.PUBLISHED,
    );
    setDishesToChoose(dishesPublished.filter((dish) => !dish.discountPrice));
    setOfferedDishes(dishesPublished.filter((dish) => dish.discountPrice));
  }, [dishes]);

  useEffect(() => {
    if (pendingEvent) {
      if (removeOfferedDish) {
        setOfferedDishes(pendingEvent.target);
        setDishesToChoose(pendingEvent.source);
        setPendingEvent(undefined);
        setRemoveOfferedDish(false);
      }
      //* Clear the pending event
      setPendingEvent(undefined);
      setRemoveOfferedDish(false);
    }
  }, [removeOfferedDish, pendingEvent]);

  return (
    <AdminLayout>
      <PickList
        className="-z-50 mx-10 mt-10"
        dataKey="id"
        source={dishesToChoose}
        target={offeredDishes}
        onChange={handleChange}
        onMoveToSource={(e) => {
          const someDishIsOffered = e.value.some(
            (dish: DishModel) => dish.discountPrice,
          );
          if (someDishIsOffered) {
            const confirm = window.confirm(
              "Are you sure you want to remove all dishes from the offer?",
            );
            if (confirm) {
              startDeletingManyDishOffers(
                e.value.map((dish: DishModel) => dish.id),
              )
                .then(() => {
                  setRemoveOfferedDish(true);
                })
                .catch(() => {
                  setRemoveOfferedDish(false);
                });
            }
            return;
          }

          setRemoveOfferedDish(true);
        }}
        onMoveAllToSource={(e) => {
          const someDishIsOffered = e.value.some(
            (dish: DishModel) => dish.discountPrice,
          );
          if (someDishIsOffered) {
            const confirm = window.confirm(
              "Are you sure you want to remove all dishes from the offer?",
            );

            if (confirm) {
              startDeletingManyDishOffers(
                e.value.map((dish: DishModel) => dish.id),
              )
                .then(() => {
                  setRemoveOfferedDish(true);
                })
                .catch(() => {
                  setRemoveOfferedDish(false);
                });
            }
            return;
          }

          setRemoveOfferedDish(true);
        }}
        onMoveToTarget={() => setRemoveOfferedDish(true)}
        onMoveAllToTarget={() => setRemoveOfferedDish(true)}
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
