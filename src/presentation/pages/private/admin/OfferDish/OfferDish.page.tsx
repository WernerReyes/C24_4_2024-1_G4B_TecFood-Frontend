import { useEffect, useState } from "react";
import { AdminLayout } from "../layout";
import { useDishStore } from "@/presentation/hooks";
import {
  ConfirmDialog,
  PickList,
  type PickListChangeEvent,
} from "@/presentation/core/components";
import type { DishModel } from "@/model";
import { StatusEnum } from "@/domain/entities/enums";
import { NotificationDialog, OffertDialog, PickListItem } from "./components";

interface OfferedDish extends DishModel {
  selected: boolean;
}

const OfferDishPage = () => {
  const { dishes, startDeletingManyDishOffers } = useDishStore();
  const [dishesToChoose, setDishesToChoose] = useState<DishModel[]>([]);
  const [selectedDishes, setSelectedDishes] = useState<
    Map<string, OfferedDish>
  >(new Map());
  const [offeredDishes, setOfferedDishes] = useState<OfferedDish[]>([]);
  const [{ value: valueDialog, type: typeDialog }, setOpenDialog] = useState<{
    value: boolean;
    type: "notification" | "offer";
  }>({
    value: false,
    type: "offer",
  });

  const [removeOfferedDish, setRemoveOfferedDish] = useState<boolean>(false);
  const [pendingEvent, setPendingEvent] = useState<PickListChangeEvent>();
  const [visible, setVisible] = useState(false);

  const handleChange = (e: PickListChangeEvent) => setPendingEvent(e);

  const handleConfirmDeleteOffer = () => {
    startDeletingManyDishOffers(offeredDishes.map((dish) => dish.id))
      .then(() => {
        setRemoveOfferedDish(true);
      })
      .catch(() => {
        setRemoveOfferedDish(false);
      });
  };

  const handleReject = () => {
    setVisible(false);
    setRemoveOfferedDish(false);
  };

  useEffect(() => {
    const dishesPublished = dishes.filter(
      (dish) => dish.status === StatusEnum.PUBLISHED,
    );
    setDishesToChoose(dishesPublished.filter((dish) => !dish.discountPrice));

    setOfferedDishes(
      dishesPublished
        .map((dish) => ({ ...dish, selected: false }))
        .filter((dish) =>
          selectedDishes.size
            ? selectedDishes.has(dish.id.toString())
            : dish.discountPrice,
        ),
    );
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
      <ConfirmDialog
        visible={visible}
        message={
          "Some dishes are already offered. Are you sure you want to remove them?"
        }
        onHide={() => setVisible(false)}
        accept={handleConfirmDeleteOffer}
        reject={handleReject}
      />
      <PickList
        className="-z-50 mx-10 my-10"
        dataKey="id"
        source={dishesToChoose}
        target={offeredDishes}
        onChange={handleChange}
        onMoveToSource={(e) => {
          const someDishIsOffered = e.value.some(
            (dish: DishModel) => dish.discountPrice,
          );
          if (someDishIsOffered) return setVisible(true);

          setRemoveOfferedDish(true);
        }}
        onMoveAllToSource={(e) => {
          const someDishIsOffered = e.value.some(
            (dish: DishModel) => dish.discountPrice,
          );
          if (someDishIsOffered) return setVisible(true);

          setRemoveOfferedDish(true);
        }}
        onMoveToTarget={(e) => {
          setSelectedDishes(
            new Map(
              e.value.map((dish: DishModel) => [
                dish.id.toString(),
                { ...dish, selected: true },
              ]),
            ),
          );

          setRemoveOfferedDish(true);
        }}
        onMoveAllToTarget={() => setRemoveOfferedDish(true)}
        filter
        sourceItemTemplate={(dish: DishModel) => (
          <PickListItem
            type="source"
            dish={dish}
            setOpenDialog={setOpenDialog}
          />
        )}
        targetItemTemplate={({ selected, ...dish }: OfferedDish) => (
          <PickListItem
            type="target"
            dish={dish}
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

      {typeDialog === "offer" && (
        <OffertDialog openDialog={valueDialog} setOpenDialog={setOpenDialog} />
      )}

      {typeDialog === "notification" && (
        <NotificationDialog
          openDialog={valueDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
    </AdminLayout>
  );
};

export default OfferDishPage;
