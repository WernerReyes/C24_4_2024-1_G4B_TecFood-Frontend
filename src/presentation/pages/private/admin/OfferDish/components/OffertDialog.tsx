import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDishStore, useWindowSize } from "@/presentation/hooks";
import { Nullable } from "primereact/ts-helpers";
import { Button, Dialog, Knob, Calendar } from "@/presentation/core/components";
import { PutDishOfferRequest } from "@/domain/dtos";

const DEFAULT_DISCOUNT_PERCENTAGE = 1;

type Props = {
  openDialog: boolean;
  setOpenDialog: ({ value, type }: { value: boolean, type: "offer" }) => void;
};

export const OffertDialog = ({ openDialog, setOpenDialog }: Props) => {
  const { control, handleSubmit, reset } = useForm<PutDishOfferRequest>({
    resolver: zodResolver(PutDishOfferRequest.schema),
  });
  const { width, md } = useWindowSize();
  const { dish, startLoadingEmptyDish, startPuttingDishOffer } = useDishStore();
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(
    DEFAULT_DISCOUNT_PERCENTAGE,
  );

  const handleSaveOffer = (putDishOfferRequest: PutDishOfferRequest) => {
    startPuttingDishOffer(putDishOfferRequest).then(() => setOpenDialog({
      value: false,
      type: "offer",
    }));
  };

  useEffect(() => {
    if (!openDialog) {
      reset();
      setDates(null);
      setDiscountPercentage(DEFAULT_DISCOUNT_PERCENTAGE);
      startLoadingEmptyDish();
    }
  }, [openDialog]);

  useEffect(() => {
    const [saleStartDate, saleEndDate] = dates || [undefined, undefined];
    reset({
      discountPercentage:
        dish.discountPercentage ?? DEFAULT_DISCOUNT_PERCENTAGE,
      dishId: dish.id,
      saleStartDate: saleStartDate!,
      saleEndDate: saleEndDate!,
    });
  }, [dates]);

  useEffect(() => {
    reset({
      dishId: dish.id,
      saleEndDate: dish.saleEndDate ? new Date(dish.saleStartDate) : undefined,
      saleStartDate: dish.saleStartDate
        ? new Date(dish.saleEndDate)
        : undefined,
      discountPercentage:
        dish.discountPercentage ?? DEFAULT_DISCOUNT_PERCENTAGE,
    });

    if (dish.saleStartDate && dish.saleEndDate) {
      setDates([new Date(dish.saleStartDate), new Date(dish.saleEndDate)]);
    }

    if (dish.discountPercentage) {
      setDiscountPercentage(dish.discountPercentage);
    }
  }, [dish]);

  return (
    <Dialog
      header="Offer Details"
      visible={openDialog}
      style={{ width: width <= md ? "90vw" : "70vw" }}
      onHide={() => setOpenDialog({
        value: false,
        type: "offer",
      })}
    >
      <form className="w-full" onSubmit={handleSubmit(handleSaveOffer)}>
        <div className="grid gap-x-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Calendar
              value={dates}
              onChange={(e) => setDates(e.value)}
              onClearButtonClick={() => setDates(null)}
              selectionMode="range"
              readOnlyInput
              showButtonBar
              showTime
              inline
              hourFormat="12"
              hideOnRangeSelection
            />
          </div>
          <div className="flex items-center justify-evenly gap-x-10 max-lg:mt-5 lg:col-span-1 lg:flex-col lg:items-center">
            <Controller
              name="saleStartDate"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Calendar
                    value={field.value}
                    name={field.name}
                    label="Sale Start Date"
                    placeholder="Dish Name"
                    showTime
                    disabled
                    error={!!error}
                    smallDescription={error?.message}
                  />
                );
              }}
            />

            <Controller
              name="saleEndDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Calendar
                  value={field.value}
                  name={field.name}
                  label="Sale End Date"
                  placeholder="Dish Name"
                  showTime
                  disabled
                  error={!!error}
                  smallDescription={error?.message}
                />
              )}
            />

            <Controller
              name="discountPercentage"
              control={control}
              defaultValue={DEFAULT_DISCOUNT_PERCENTAGE}
              render={() => (
                <Knob
                  min={DEFAULT_DISCOUNT_PERCENTAGE}
                  valueColor="#00B1F7"
                  labelClassName="text-center"
                  label="Discount Percentage"
                  className="cursor-pointer"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.value)}
                  valueTemplate={"{value}%"}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Button icon="pi pi-save" className="w-25 lg:mt-5" label="Save" />
        </div>
      </form>
    </Dialog>
  );
};
