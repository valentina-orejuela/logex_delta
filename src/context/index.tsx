import React from "react";

export type ShippingContextProps = {
  customerId: string;
};

const initialData: ShippingContextProps = {
  customerId: ''
}

export const ShippingOptionContext = React.createContext<ShippingContextProps>(
  initialData
);
