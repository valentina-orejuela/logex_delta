import { useState, useEffect, useCallback } from "react";
import { ICliente, IShipping } from "types";
import { ShippingList } from "types/props.types";
import { getCollectionPath } from "api";

const CUSTOMERS_REF = () => getCollectionPath().clientes;
const SHIPPINGS = "shippings";

type ShippingInitialState = {
  shippings: ShippingList;
  loading: boolean;
};

export function useShippingCollection(customerId: string) {
  const [state, setDocs] = useState<ShippingInitialState>({
    shippings: {},
    loading: true,
  });

  useEffect(() => {
    if (CUSTOMERS_REF()) {
      let collection = CUSTOMERS_REF()?.doc(customerId).collection(SHIPPINGS);

      const unsubscribe = collection?.onSnapshot((data) => {
        let docs: ShippingList = {};
        data.forEach((doc) => {
          docs[doc.id] = doc.data() as IShipping;
        });
        setDocs({ shippings: docs, loading: false });
      });

      return () => {
        unsubscribe?.();
      };
    }
  }, [customerId]);
  return state;
}

export function createCustomer(data: ICliente): Promise<any> {
  return CUSTOMERS_REF().doc(data.id).set(data);
}

export const getCustomer = (id: string): Promise<any> => {
  const docRef = CUSTOMERS_REF().doc(id);
  return docRef.get();
};

export const createShipping = (
  id: string,
  shipping: IShipping
): Promise<any> => {
  const customerRef = CUSTOMERS_REF().doc(id);
  return customerRef.collection(SHIPPINGS).doc().set(shipping);
};

export const getShipping = (
  customerId: string,
  shippingId: string
): Promise<any> => {
  return CUSTOMERS_REF()
    .doc(customerId)
    .collection(SHIPPINGS)
    .doc(shippingId)
    .get();
};

export const getShippingList = (customerId: string): Promise<ShippingList> => {
  return CUSTOMERS_REF()
    .doc(customerId)
    .collection(SHIPPINGS)
    .get()
    .then((querySnapshot) => {
      let shippings: ShippingList = {};
      querySnapshot.forEach((doc) => {
        shippings[doc.id] = doc.data() as IShipping;
      });
      return shippings;
    });
};

type FetchedUseShippingSelection = {
  shippings: ShippingList;
  loading: boolean;
  error: boolean;
};

export const useShippingSelection = (
  customerId: string | undefined,
  shippingId: string | undefined
) => {
  const [state, setState] = useState<FetchedUseShippingSelection>({
    shippings: {} as ShippingList,
    loading: true,
    error: false,
  });

  const getShippingListFn = useCallback(() => {
    if (customerId) {
      getShippingList(customerId)
        .then((shippings) => {
          setState((state) => ({ ...state, shippings, loading: false }));
        })
        .catch((error) => {
          setState((state) => ({ ...state, loading: false, error: true }));
          console.log(
            "There was an error trying to get customer's shippings. ",
            error
          );
        });
    }
  }, [customerId]);

  useEffect(() => {
    console.log("fetch shipping0: ", customerId, shippingId);
    if (customerId) {
      if (shippingId) {
        getShipping(customerId, shippingId)
          .then((doc) => {
            if (doc.exists) {
              const shipping: IShipping = doc.data();
              console.log("fetch shipping DOC: ", doc.data());
              const shippings: ShippingList = {
                [doc.id]: shipping,
              };
              setState((state) => ({ ...state, shippings, loading: false }));
            } else {
              getShippingListFn();
            }
          })
          .catch((error) => {
            console.log("Error fetching the shipping data. ", error);
            setState((state) => ({ ...state, loading: false, error: true }));
          });
      } else {
        getShippingListFn();
      }
    } else {
      console.log("There is not a customer id to fetch shipping data");
      setState((state) => ({ ...state, loading: false }));
    }
  }, [customerId, shippingId, getShippingListFn]);

  return state;
};

export const editShipping = (
  customerId: string,
  shippingId: string,
  shipping: IShipping
) => {
  // console.log("[api] edit shipping: ", customerId, shippingId, shipping);
  const shippingRef = CUSTOMERS_REF()
    .doc(customerId)
    .collection(SHIPPINGS)
    .doc(shippingId);
  return shippingRef.update(shipping);
};

export const deleteShipping = (
  customerId: string,
  shippingId: string
): Promise<any> => {
  const customerRef = CUSTOMERS_REF().doc(customerId);
  return customerRef.collection(SHIPPINGS).doc(shippingId).delete();
};
