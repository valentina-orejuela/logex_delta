// import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { IUser } from "types";
// import { ShippingList } from "types/props.types";
import { DBCollections } from "api";

const COLLECTION_NAME = DBCollections.users;

export const createUser = (id: string, user: IUser): Promise<any> => {
  return db.collection(COLLECTION_NAME).doc(id).set(user);
};

export const getUser = (userId: string): Promise<any> => {
  return db
    .collection(COLLECTION_NAME)
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const user = doc.data() as IUser;
        console.log("user fetched api: ", user);
        return user;
        // setState((state) => ({ ...state, ...shipping }));
      }
    })
    .catch((error) => {
      console.log("Error fetching user. ", error);
      return null;
    //   setError(true);
    });
};
