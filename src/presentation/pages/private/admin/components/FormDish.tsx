import type { DishDto } from "@/domain/dtos";
import { DishModel } from "@/model";
import {
  Button,
  InputNumber,
  InputText,
  InputTextarea,
  MultiSelect,
} from "@/presentation/core/components";
import { useDishCategoryStore } from "@/presentation/hooks";
import { FormEventHandler, useEffect } from "react";
import { Control, Controller, UseFormReset } from "react-hook-form";

type Props = {
  dish: DishModel;
  control: Control<DishDto, any>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  reset: UseFormReset<DishDto>;
  errors: boolean;
};

export const FormDish = ({
  control,
  handleSubmit,
  dish,
  reset,
  errors,
}: Props) => {
  const { startLoadingDishCategories, isLoading, dishCategories } =
    useDishCategoryStore();

  useEffect(() => {
    startLoadingDishCategories();
  }, []);

  useEffect(() => {
    reset(dish);
  }, [dish]);

  return (
    <form className="flex h-full flex-col space-y-4" onSubmit={handleSubmit}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <InputText
            {...field}
            type="text"
            label="Dish Name"
            placeholder="Dish Name"
            error={!!error?.message}
            smallDescription={error?.message}
            className="border-2 border-skeleton bg-transparent py-3 text-sm dark:border-skeleton-dark"
          />
        )}
      />

      <Controller
        name="categories"
        control={control}
        defaultValue={[]}
        render={({ field, fieldState: { error } }) => {
          return (
            <MultiSelect
              {...field}
              loading={isLoading}
              options={dishCategories}
              label="Dish category"
              optionLabel="name"
              placeholder="Select..."
              display="chip"
              filter
              error={!!error?.message}
              smallDescription={error?.message}
              className="border-2 border-skeleton bg-transparent text-sm dark:border-skeleton-dark"
            />
          );
        }}
      />

      <Controller
        name="price"
        control={control}
        defaultValue={0.0}
        render={({ field, fieldState: { error } }) => (
          <InputNumber
            ref={field.ref}
            value={field.value}
            onValueChange={(e) => field.onChange(e.value)}
            label="Price"
            placeholder="Price"
            locale="pe-PE"
            currency="PEN"
            mode="currency"
            min={0}
            maxFractionDigits={2}
            minFractionDigits={2}
            error={!!error}
            smallDescription={error?.message}
            className="border-2 border-skeleton bg-transparent py-3 text-sm dark:border-skeleton-dark"
          />
        )}
      />

      <Controller
        name="stock"
        control={control}
        defaultValue={0}
        render={({ field, fieldState: { error } }) => (
          <InputNumber
            ref={field.ref}
            value={field.value}
            onValueChange={(e) => field.onChange(e.value)}
            invalid
            label="Quantity"
            placeholder="Quantity in stock"
            min={0}
            error={!!error}
            smallDescription={error?.message}
            className="border-2 border-skeleton bg-transparent py-3 text-sm dark:border-skeleton-dark"
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <InputTextarea
            {...field}
            invalid
            label="Description"
            placeholder="Description"
            rows={5}
            error={!!error}
            smallDescription={error?.message}
            className="border-2 border-skeleton bg-transparent py-3 text-sm dark:border-skeleton-dark"
          />
        )}
      />

      <div className="flex h-full items-end">
        {!dish.name && (
          <Button
            type="button"
            onClick={() => reset()}
            label="Cancel"
            icon="pi pi-eraser"
            className="me-3 w-32 rounded-md bg-primary-darker/20   text-primary shadow-sm transition-all duration-300"
          />
        )}
        
      
        <Button
          type="submit"
          label="Save"
          icon="pi pi-save"
          className="mx-auto mb-auto w-32 rounded-md dark:text-slate-100"
          disabled={errors}
        />
      </div>
    </form>
  );
};