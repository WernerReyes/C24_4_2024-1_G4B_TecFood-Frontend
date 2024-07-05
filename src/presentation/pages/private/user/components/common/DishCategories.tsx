import { useEffect, useState } from "react";
import { useDishCategoryStore, useDishStore } from "@/presentation/hooks";
import { Checkbox, CheckboxChangeEvent } from "@/presentation/components";
import { DishCategoryModel } from "@/model";

export const DishCategories = () => {
  const { dishCategories, startLoadingDishCategories } = useDishCategoryStore();
  const { startFilterDishes, filters } = useDishStore();
  const [selectedCategories, setSelectedCategories] = useState<
    DishCategoryModel[]
  >([]);
  const [selectedIds, setSelectedIds] = useState<{ idCategory: number }[]>(
    filters.idCategory || [],
  );

  const onCategoryChange = (e: CheckboxChangeEvent) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) {
      _selectedCategories.push(e.value);
      setSelectedIds([...selectedIds, { idCategory: e.value.id }]);
    } else {
      _selectedCategories = _selectedCategories.filter(
        (category) => category.id !== e.value.id,
      );
      setSelectedIds(selectedIds.filter((id) => id.idCategory !== e.value.id));
    }

    setSelectedCategories(_selectedCategories);
  };

  useEffect(() => {
    startLoadingDishCategories();
  }, []);

  useEffect(() => {
    setSelectedCategories(
      categoriesStorageSelected(filters.idCategory, dishCategories),
    );
  }, [filters.idCategory, dishCategories]);

  useEffect(() => {
    startFilterDishes({
      idCategory: selectedIds,
      priceRange: filters.priceRange,
      search: ''
    });
  }, [selectedIds]);

  return (
    <section className="flex flex-col space-y-2">
      {dishCategories.map((category) => (
        <div key={category.id} className="align-items-center flex">
          <Checkbox
            inputId={category.id.toString()}
            name="category"
            value={category}
            onChange={onCategoryChange}
            checked={selectedCategories.some((item) => item.id === category.id)}
          />
          <label htmlFor={category.id.toString()} className="ml-2">
            {category.name}
          </label>
        </div>
      ))}
    </section>
  );
};

const categoriesStorageSelected = (
  filterCategoryId: { idCategory: number }[] | null,
  categories: DishCategoryModel[],
): DishCategoryModel[] => {
  if (filterCategoryId === null) return [];
  return categories.filter((category) =>
    filterCategoryId.some((id) => id.idCategory === category.id),
  );
};
