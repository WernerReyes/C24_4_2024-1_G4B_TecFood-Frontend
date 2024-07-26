import { AccordionTab } from "primereact/accordion";
import { DishCategories, PriceRange } from "./";
import { Accordion, Image, Card, Button } from "@/presentation/core/components";
import { useDishStore } from "@/presentation/hooks";

export const FilterSection = () => {
  const {
    dishesPaginated,
    filters: { priceRange },
  } = useDishStore();

  return (
    <>
      <Accordion multiple activeIndex={[0, 1]}>
        <AccordionTab header="CATEGORY">
          <DishCategories />
        </AccordionTab>
        <AccordionTab
          header={`PRICE RANGE ( ${priceRange.min} - ${priceRange.max} )`}
        >
          <PriceRange />
        </AccordionTab>
      </Accordion>

      {dishesPaginated.length && (<Card
        className="mt-4"
        header={
          <Image
            src={dishesPaginated[0].images[0].url}
            alt="dish-offer"
            className="h-full w-full object-cover"
          />
        }
        footer={
          <>
            <Button icon="pi pi-arrow-right" label="Order now"   />
            <div className="flex justify-between mt-5">
              <p className="text-xs font-bold">{dishesPaginated[0].categories[0].name}</p>
              <p className="text-xs font-bold">Stock: {dishesPaginated[0].description}</p>
            </div>
          </>
        }
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold">{dishesPaginated[0].name}</h2>
          <p className="text-md">{dishesPaginated[0].description}</p>
          <p className="text-sm font-bold mt-5 block">
            Avalilable at: <strong className="text-lg block">S/.{dishesPaginated[0].price}</strong>
          </p>
        </div>
      </Card>
      )} 
      
    </>
  );
};
