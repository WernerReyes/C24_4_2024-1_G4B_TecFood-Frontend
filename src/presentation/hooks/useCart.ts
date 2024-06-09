import { useEffect, useState } from "react";
import { useCartStore, useMessage } from "./";
import { TypeMessage } from "@/infraestructure/store";

type To = "card" | "table";

export const useCart = (dishId: number, quantity: number, to: To) => {
  const { startSetMessages } = useMessage();
  const {
    startAddOneDish,
    totalQuantity,
    startDeleteOneDish,
    startdeleteAllDishes,
  } = useCartStore();
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [quantityMemory, setQuantityMemory] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (quantity > 0) {
      setIsAddToCart(true);
      setQuantityMemory(quantity);
    }
  }, [quantity, to === "table" ? quantityMemory : null]);

  const handleAddToCart = () => {
    if (quantityMemory > 5 || totalQuantity > 5)
      return startSetMessages(
        ["You can't add more than 5 items"],
        TypeMessage.ERROR,
      );

    startAddOneDish(dishId).then(() => {
      setQuantityMemory(quantityMemory + 1);
      setIsAddToCart(true);
    });
  };

  const handleRemoveToCart = () => {
    startDeleteOneDish(dishId).then(() => {
      setQuantityMemory(quantityMemory - 1);
    });

    if (quantityMemory === 1) {
      setIsAddToCart(false);
    }
  };

  const handleResetCart = () => {
    startdeleteAllDishes(dishId).then(() => {
      setQuantityMemory(0);
      setIsAddToCart(false);
    });
  };

  const handleLoaded = () => setLoaded(true);

  return {
    isAddToCart,
    setIsAddToCart,
    quantityMemory,
    setQuantityMemory,
    handleResetCart,
    handleRemoveToCart,
    handleAddToCart,
    handleLoaded,
    loaded,
  };
};
