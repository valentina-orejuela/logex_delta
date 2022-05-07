import { db } from "../firebase/firebase";
import { ExpoActivityList } from "types";
import { SelectTypeBoxOptionTagList } from "types/table-type/table.types";

import { DBCollections, getCollectionPath } from "api";
import {
  initialExpoSettingList,
  initialContainerTypeOptions,
} from "app_constants";

const SETTING_REF = () => getCollectionPath().settings;
export const SETTING_PATHS = {
  expo: "expo",
  commons: "commons",
  container_types: "types",
  supplier_types: "types",
};

export const getContainerTypesDatabaseRef = () =>
  SETTING_REF()
    .doc(SETTING_PATHS.commons)
    .collection(DBCollections.settings_commons_containers);

export const getSuppliersTypesDatabaseRef = () =>
  SETTING_REF()
    .doc(SETTING_PATHS.commons)
    .collection(DBCollections.settings_commons_suppliers);

type ActivitiesSettingsFetched = {
  activities: ExpoActivityList;
};

export const loadSettings = (companyId: string) => {
  const activitiesSettings: ActivitiesSettingsFetched = {
    activities: initialExpoSettingList,
  };
  const commonSettings = {
    options: initialContainerTypeOptions,
  };

  const ref = db
    .collection(DBCollections.companies)
    .doc(companyId)
    .collection(DBCollections.settings);

  ref.doc(SETTING_PATHS.expo).set(activitiesSettings);
  ref
    .doc(SETTING_PATHS.commons)
    .collection(DBCollections.settings_commons_containers)
    .doc(SETTING_PATHS.container_types)
    .set(commonSettings);
};

export const getCompanyExpoDefaultActivities =
  (): Promise<ExpoActivityList> => {
    return SETTING_REF()
      .doc(SETTING_PATHS.expo)
      .get()
      .then((doc) => {
        let settings: ExpoActivityList = [];
        console.log("settings data: ", doc.exists, doc.data());
        if (doc.exists) {
          const data = doc.data() as ActivitiesSettingsFetched;
          settings = data.activities;
        }
        return settings;
      })
      .catch((error) => {
        console.warn(
          "Error trying to fetch expo settings. Sending defaults instead. ",
          error
        );
        return initialExpoSettingList;
      });
  };

export const updateExpoSettings = (
  activities: ExpoActivityList
): Promise<void> => {
  return SETTING_REF().doc(SETTING_PATHS.expo).update({
    activities,
  });
};

export const updateContainerTypeSettings = (
  containerTypeSettingList: SelectTypeBoxOptionTagList
): Promise<void> => {
  return getContainerTypesDatabaseRef()
    .doc(SETTING_PATHS.container_types)
    .update({
      options: containerTypeSettingList,
    });
};

export const updateSupplierTypeSettings = (
  supplierTypeSettingList: SelectTypeBoxOptionTagList
): Promise<void> => {
  return getSuppliersTypesDatabaseRef()
    .doc(SETTING_PATHS.supplier_types)
    .set({
      options: supplierTypeSettingList,
    });
};
