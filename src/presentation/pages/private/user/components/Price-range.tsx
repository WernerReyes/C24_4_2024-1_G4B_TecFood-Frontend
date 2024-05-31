import { useEffect, useState, useRef } from "react";
import { Slider, SliderChangeEvent } from "@/presentation/components";
import { useDishStore } from "@/presentation/hooks";

export const PriceRange = () => {
  const { startFilterDishes, filters } = useDishStore();
  const { min, max } = filters.priceRange;
  const [value, setValue] = useState<[number, number]>([min, max]);
  const [confirmedValue, setConfirmedValue] = useState<[number, number]>([
    min,
    max,
  ]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: SliderChangeEvent) => {
    setValue(e.value as [number, number]);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setConfirmedValue(e.value as [number, number]);
    }, 500);
  };

  useEffect(() => {
    setValue([filters.priceRange?.min || 0, filters.priceRange?.max || 0]);
  }, [filters.priceRange]);

  useEffect(() => {
    if (
      confirmedValue[0] !== filters.priceRange?.min ||
      confirmedValue[1] !== filters.priceRange?.max
    ) {
      startFilterDishes({
        idCategory: filters.idCategory,
        priceRange: { min: confirmedValue[0], max: confirmedValue[1] },
        search: "",
      });
    }
  }, [confirmedValue]);

  return (
    <Slider value={value} onChange={handleChange} className="w-14rem" range />
  );
};
