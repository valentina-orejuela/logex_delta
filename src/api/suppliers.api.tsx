import { useState, useEffect } from "react";
import { ISupplier, SupplierList } from "types";
import { FetchSupplierList } from "types/props.types";
import {
  SelectTypeBoxOptionTagListObj,
  SelectTypeBoxOptionTagList,
} from "types/table-type/table.types";
import { getCollectionPath } from "api";
import { getSuppliersTypesDatabaseRef, SETTING_PATHS } from "api/settings.api";

const SUPPLIERS_REF = () => getCollectionPath().proveedores;
const SUPPLIERS_SETTINGS_REF = () => getSuppliersTypesDatabaseRef();

export function useSuppliers() {
  const [state, setState] = useState<FetchSupplierList>({
    supplierList: [],
    loading: true,
  });

  useEffect(() => {
    const unsubscribeContainersListener = SUPPLIERS_REF().onSnapshot(
      (querySnapshot) => {
        const list = [] as SupplierList;
        querySnapshot.forEach((doc) => {
          list.push(doc.data() as ISupplier);
        });
        list.sort(
          (containerA, containerB) =>
            containerA.createdAt - containerB.createdAt
        );
        setState({ supplierList: list, loading: false });
      }
    );

    return () => {
      unsubscribeContainersListener?.();
    };
  }, []);
  return state;
}

export function createSupplier(data: ISupplier) {
  const supplierRef = SUPPLIERS_REF().doc();
  const dataWithId = { ...data, id: supplierRef.id };
  supplierRef
    .set(dataWithId)
    .then
    //
    ()
    .catch((error) => {
      console.log("Error trying to create supplier: ", error);
    });
}

export const updateSupplier = async (
  supplierId: string,
  supplierData: ISupplier
) => {
  console.log("updateSupplier: ", supplierId, supplierData);

  const supplierRef = SUPPLIERS_REF().doc(supplierId);
  try {
    await supplierRef.update(supplierData);
  } catch (error) {
    console.warn("Error updating supplier: ", error);
  }
};

export function deleteSupplier(supplierId: string): Promise<any> {
  return SUPPLIERS_REF().doc(supplierId).delete();
}

export function useSupplierOptionList() {
  const [selectionOptionLists, setSelectionOptionLists] =
    useState<SelectTypeBoxOptionTagListObj>({
      role: {
        data: [],
        editable: true,
      }, // this key must be equal to the IContainer type
    });

  useEffect(() => {
    const unsubscribeCommonSettingListener =
      SUPPLIERS_SETTINGS_REF().onSnapshot((querySnapshot) => {
        let list = [] as SelectTypeBoxOptionTagList;
        querySnapshot.forEach((doc) => {
          if (doc.id === SETTING_PATHS.supplier_types) {
            list = doc.data()?.options;
          }
        });
        setSelectionOptionLists((state) => ({
          ...state,
          role: { ...state.role, data: list },
        }));
      });

    return () => {
      unsubscribeCommonSettingListener?.();
    };
  }, []);
  return selectionOptionLists;
}
