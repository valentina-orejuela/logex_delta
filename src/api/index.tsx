import { useState, useEffect, useRef } from "react";
import { CollectionReference, DocumentData } from "@firebase/firestore-types";
import { useDispatch } from "react-redux";
import { db } from "../firebase/firebase";
import { IExpo, ICliente } from "types";
import { ExpoList, CustomerList } from "types/props.types";
import { syncCustomers } from "actions/customer.actions";

export enum DBCollections {
  companies = "companies",
  exportaciones = "exportaciones",
  containers = "containers",
  // contenedores = "contenedores",
  clientes = "clientes",
  proveedores = "proveedores",
  users = "users",
  settings = "settings",
  settings_commons_containers = "containers",
  settings_commons_suppliers = "suppliers",
}

type CollectionPaths = {
  root: DocumentData;
  exportaciones: CollectionReference;
  // contenedores: CollectionReference;
  clientes: CollectionReference;
  proveedores: CollectionReference;
  settings: CollectionReference;
};

export const CollectionPath: CollectionPaths = {
  root: db.collection(DBCollections.companies),
  exportaciones: db
    .collection(DBCollections.companies)
    .doc("unauthorized")
    .collection(DBCollections.exportaciones),
  // contenedores: db
  //   .collection(DBCollections.companies)
  //   .doc("unauthorized")
  //   .collection(DBCollections.contenedores),
  clientes: db
    .collection(DBCollections.companies)
    .doc("unauthorized")
    .collection(DBCollections.clientes),
  proveedores: db
    .collection(DBCollections.companies)
    .doc("unauthorized")
    .collection(DBCollections.proveedores),
  settings: db
    .collection(DBCollections.companies)
    .doc("unauthorized")
    .collection(DBCollections.settings),
};

export const getCollectionPath = (): CollectionPaths => {
  return {
    root: CollectionPath.root,
    exportaciones: CollectionPath.exportaciones,
    // contenedores: CollectionPath.contenedores,
    clientes: CollectionPath.clientes,
    proveedores: CollectionPath.proveedores,
    settings: CollectionPath.settings,
  };
};

export const initFirebaseCollections = (companyId: string) => {
  const companyRef = db.collection(DBCollections.companies).doc(companyId);

  CollectionPath.root = companyRef;

  CollectionPath.exportaciones = companyRef.collection(
    DBCollections.exportaciones
  );
  // CollectionPath.contenedores = companyRef.collection(
  //   DBCollections.contenedores
  // );
  CollectionPath.clientes = companyRef.collection(DBCollections.clientes);
  CollectionPath.proveedores = companyRef.collection(DBCollections.proveedores);
  CollectionPath.settings = companyRef.collection(DBCollections.settings);
  // console.log("initFirebaseCollections: ", companyId, CollectionPath);
};

export function useInitialLoadCollection(companyId: string) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  let unsubscribeCustomers: any = useRef(null);
  let unsubscribeExpo: any = useRef(null);

  useEffect(() => {
    if (companyId) {
      let { exportaciones, clientes } = getCollectionPath();
      if (exportaciones && clientes) {
        const exportsP = new Promise<void>((resolve, reject) => {
          unsubscribeExpo.current = exportaciones?.onSnapshot((data) => {
            let docs: ExpoList = {};
            data.forEach((doc) => {
              docs[doc.id] = doc.data() as IExpo;
            });
            dispatch({
              type: "INITIAL_LOAD",
              exportaciones: docs,
            });
            resolve();
          });
        });

        const customersP = new Promise<void>((resolve, reject) => {
          unsubscribeCustomers.current = clientes?.onSnapshot((data) => {
            let docs: CustomerList = {};
            data.forEach((doc) => {
              docs[doc.id] = doc.data() as ICliente;
            });
            dispatch(syncCustomers(docs));
            resolve();
          });
        });

        Promise.all([exportsP, customersP]).then(() => {
          setLoading(false);
        });

        return () => {
          // TODO check if this is actually working
          unsubscribeExpo?.current?.();
          unsubscribeCustomers?.current?.();
        };
      }
    } else {
      // setLoading(false); do not do this, otherwise it will break the app if user refresh in a particular route, eg custome page
    }
  }, [dispatch, companyId]);
  return loading;
}
