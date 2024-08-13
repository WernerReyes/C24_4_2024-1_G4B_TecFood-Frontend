import type { DishModel } from "@/model";
import { Button, Image } from "@/presentation/core/components";
import { StatusColor } from "../../../components";
import { OfferIcon } from "@/presentation/core/icons";
import { useDishStore } from "@/presentation/hooks";

type Props = {
  dish: DishModel;
  type: "source" | "target";
  setOpenDialog: ({
    value,
    type,
  }: {
    value: boolean;
    type: "offer" | "notification";
  }) => void;
};

export const PickListItem = ({ dish, type, setOpenDialog }: Props) => {
  const { startLoadingDish } = useDishStore();

  return (
    <div className="mb-3 border-b dark:border-primary/10 dark:border-slate-700">
      <div className="flex flex-row items-center gap-4 sm:p-4">
        <Image
          className="mx-auto h-28 w-28"
          imageClassName="w-full h-full object-cover shadow-2 border-round mx-auto block w-9 block"
          src={dish.images[0].url}
          alt={dish.name}
        />
        <div className="flex flex-1  flex-row items-start justify-between gap-4">
          <div className="flex h-full flex-col items-start gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-900 text-md font-bold">{dish.name}</div>
            </div>
            {type === "target" && (
              <>
                <span className="text-xl font-semibold">${dish.price}</span>
                <StatusColor status={dish.status} />
              </>
            )}
            {/* <div className="flex flex-col gap-2"> */}
            {/* <Rating
                      value={item.rating}
                      readOnly
                      cancel={false}
                    ></Rating> */}
            {/* </div> */}
          </div>
          <div className="my-auto flex h-full flex-col items-center justify-center gap-2">
            {type === "source" ? (
              <>
                <span className="text-xl font-semibold">${dish.price}</span>
                <StatusColor status={dish.status} />
              </>
            ) : (
              <div className="flex flex-wrap items-center justify-evenly gap-x-2">
                <Button
                  onClick={() => {
                    setOpenDialog({
                      value: true,
                      type: "offer",
                    });
                    startLoadingDish(dish);
                  }}
                  label={dish.discountPrice ? "Edit Offer" : "Add Offer"}
                  icon={
                    <OfferIcon className="m-auto me-2 h-6 w-6 dark:text-white" />
                  }
                  className="w-25  flex items-center text-xs dark:text-white"
                />
                {dish.discountPrice && (
                  <Button
                    rounded
                    onClick={() => {
                      setOpenDialog({
                        value: true,
                        type: "notification",
                      });
                      startLoadingDish(dish);
                    }}
                    icon="pi pi-bell"
                    className="mt-2 flex h-8 w-8 items-center text-xs dark:text-white"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
