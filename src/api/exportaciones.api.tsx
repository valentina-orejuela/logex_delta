import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { syncExport } from "actions/exportaciones.actions";
// import { fieldValue } from '../firebase/firebase';

import {
  IExpo,
  IReserva,
  // ContainerList,
  ContainerListArray,
  IContainer,
  SupplierRole,
} from "types";
import {
  FetchExpo,
  ExpoList,
  StateType,
  FetchContainerList,
  UpdateExpoProgressProps,
} from "types/props.types";
import {
  TSelectTypeBoxOptionTag,
  SelectTypeBoxOptionTagListObj,
  SelectTypeBoxOptionTagList,
} from "types/table-type/table.types";
import { DBCollections, getCollectionPath } from "api";
import { getContainerTypesDatabaseRef, SETTING_PATHS } from "api/settings.api";
import { useSuppliers } from "api/suppliers.api";
import { initialExpoSettingList } from "app_constants";

const EXPORTACIONES_REF = () => getCollectionPath().exportaciones;
const CONTAINER_SETTINGS_REF = () => getContainerTypesDatabaseRef();

export function useExpo(expoId: string) {
  const dispatch = useDispatch();
  const [state, setState] = useState<FetchExpo>({
    expo: {} as IExpo,
    loading: true,
  });
  const expo: IExpo | undefined = useSelector(
    (state: StateType) => state.exportaciones[expoId]
  );

  useEffect(() => {
    if (expo) {
      setState((state) => ({ ...state, expo, loading: false }));
    } else {
      // ? data must come always from context to be always in sync from any update
      // ? I guess this part of the code is not longer needed or it will reach this point on an edge case
      // ? one useful case will be when the app has applied some filter to avoid fetching all database expo
      // !and user has open and expo directly from the url
      const expoRef = EXPORTACIONES_REF().doc(expoId);
      expoRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const expo = doc.data() as IExpo;
            dispatch(syncExport(expo));
            setState((state) => ({ ...state, loading: false }));
          }
        })
        .catch((error) => {
          console.log("Error fetching the expo data. ", error);
          setState((state) => ({ ...state, loading: false }));
        });
    }
  }, [expoId, expo, dispatch]);
  return state;
}

// export function useFullExpoData() {
//   const exportaciones: ExpoList = useSelector(
//     (state: StateType) => state.exportaciones
//   );

//   useEffect(() => {
//     console.log("[useFullExpoData]");
//     const containerPromises = Object.keys(exportaciones).map((expoId) => {
//       return EXPORTACIONES_REF()
//         .doc(expoId)
//         .collection(DBCollections.containers)
//         .get()
//         .then((querySnapshot) => {

//           querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//           });
//         })
//         .catch((error) => {
//           console.log("Error trying to get containers collection. ", error);
//         });
//     });
//   }, [exportaciones]);
// }

export function useContenedores(expoId: string) {
  const [state, setState] = useState<FetchContainerList>({
    containerList: [],
    loading: true,
  });

  useEffect(() => {
    const unsubscribeContainersListener = EXPORTACIONES_REF()
      .doc(expoId)
      .collection(DBCollections.containers)
      .onSnapshot((querySnapshot) => {
        const list = [] as ContainerListArray;
        querySnapshot.forEach((doc) => {
          list.push(doc.data() as IContainer);
        });
        list.sort(
          (containerA, containerB) =>
            containerA.createdAt - containerB.createdAt
        );
        setState({ containerList: list, loading: false });
      });

    return () => {
      unsubscribeContainersListener?.();
    };
  }, [expoId]);
  return state;
}

export function createExpo(expo: IExpo): Promise<any> {
  return EXPORTACIONES_REF().doc(expo.consecutivo).set(expo);
}

export const createBooking = (
  expoId: string,
  booking: IReserva
): Promise<any> => {
  const shippingRef = EXPORTACIONES_REF().doc(expoId);
  return shippingRef.update({
    booking,
  });
};

export const updateTodoItemProgress = (
  expoId: string,
  data: UpdateExpoProgressProps
): Promise<any> => {
  const expoRef = EXPORTACIONES_REF().doc(expoId);
  return expoRef.update({
    ...data,
  });
};

export const restoreExpoChecklist = (expoId: string): Promise<any> => {
  const shippingRef = EXPORTACIONES_REF().doc(expoId);
  return shippingRef.update({
    todo_list: initialExpoSettingList,
  });
};

export const createContainer = (expoId: string, containerData: IContainer) => {
  const expoContainersRef = EXPORTACIONES_REF()
    .doc(expoId)
    .collection(DBCollections.containers)
    .doc();

  const dataWithId = { ...containerData, id: expoContainersRef.id };

  expoContainersRef
    .set(dataWithId)
    .then(() => {
      console.log("Container successfully created", expoContainersRef.id);
    })
    .catch((err) => {
      console.log("Error trying to create container. ", err);
    });
};

export const updateContainer = async (
  expoId: string,
  containerId: string,
  containerData: IContainer
) => {
  const expoContainersRef = EXPORTACIONES_REF()
    .doc(expoId)
    .collection(DBCollections.containers)
    .doc(containerId);
  try {
    await expoContainersRef.update(containerData);
  } catch (error) {
    console.warn("Error updating container: ", error);
  }
};

export function deleteContainer(
  expoId: string,
  containerId: string
): Promise<any> {
  return EXPORTACIONES_REF()
    .doc(expoId)
    .collection(DBCollections.containers)
    .doc(containerId)
    .delete();
}

export function useShipmentOptionList() {
  const [selectionOptionLists, setSelectionOptionLists] =
    useState<SelectTypeBoxOptionTagListObj>({
      type: {
        data: [],
        editable: true,
      }, // this key must be equal to the IContainer type
      transport_name: {
        data: [],
        editable: false,
      }, // this key must be equal to the IContainer type
    });

  const supplierList = useSuppliers().supplierList;

  useEffect(() => {
    const inlandTransportSuppliers = supplierList.filter(
      (supplier) => supplier.role === SupplierRole.TRANSPORTE_TERRESTRE
    );
    const supplierTagList: SelectTypeBoxOptionTagList =
      inlandTransportSuppliers.map((supplier) => {
        const selectOptionTag: TSelectTypeBoxOptionTag = {
          id: `${supplier.id}-${supplier.alias}`,
          label: supplier.alias,
          color: "",
          deletable: false,
          editable: false,
        };
        return selectOptionTag;
      });
    setSelectionOptionLists((state) => ({
      ...state,
      transport_name: {
        ...state.transport_name,
        data: supplierTagList,
      },
    }));
  }, [supplierList]);

  useEffect(() => {
    const unsubscribeCommonSettingListener =
      CONTAINER_SETTINGS_REF().onSnapshot((querySnapshot) => {
        let list = [] as SelectTypeBoxOptionTagList;
        querySnapshot.forEach((doc) => {
          console.log(
            "[settings for container type] data: ",
            doc.data(),
            doc.id
          );
          if (doc.id === SETTING_PATHS.container_types) {
            list = doc.data()?.options;
          }
        });
        setSelectionOptionLists((state) => ({
          ...state,
          type: { ...state.type, data: list },
        }));
      });

    return () => {
      unsubscribeCommonSettingListener?.();
    };
  }, []);
  return selectionOptionLists;
}

// export function createDemoData(data) {
//   const { exportaciones, containers, vehiculos, drivers } = data;

//   Object.keys(exportaciones).map((expoId) => {
//     const expo = exportaciones[expoId];
//     db.collection("exportaciones").doc(expoId).set(expo);
//   });

//   Object.keys(containers).map((id) => {
//     db.collection("containers").doc(id).set(containers[id]);
//   });
//   Object.keys(vehiculos).map((id) => {
//     db.collection("vehiculos").doc(id).set(vehiculos[id]);
//   });
//   Object.keys(drivers).map((id) => {
//     db.collection("drivers").doc(id).set(drivers[id]);
//   });
// }
