import React from "react";

type Props = {
  total: number;
  subTotal: number;
  children?: React.ReactNode;
  position?: "top" | "bottom";
};

export const OrderSummaryLayout = ({
  total,
  subTotal,
  children,
  position = "bottom",
}: Props) => {
  return (
    <section className="rounded-lg border-2 bg-transparent dark:border-slate-700">
      <div className="p-6">
        <h6 className="text-xl font-bold">Order Summary</h6>
        {position === "top" && children}
        <div className="mt-4">
          <div className="my-2 flex justify-between">
            <p>Subtotal</p>
            <p>S/.{subTotal}</p>
          </div>
          <div className="my-2 flex justify-between border-t py-2 dark:border-slate-700">
            <p>Total</p>
            <p>S/.{total}</p>
          </div>
          {position === "bottom" && children}
        </div>
      </div>
    </section>
  );
};
