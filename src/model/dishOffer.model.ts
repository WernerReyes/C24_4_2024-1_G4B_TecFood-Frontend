export interface DishOffer {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DishOfferState
  extends Omit<DishOffer, "createdAt" | "updatedAt"> {}

export const dishOfferEmptyState: DishOfferState = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  img: "",
};
