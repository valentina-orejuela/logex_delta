import { IExpo } from 'types'
// import { ExpoList } from "types/props.types";

// export interface ReduxAction {
//     type: string;
//     payload: CustomerList
// }


export const SYNC_EXPORT = "SYNC_EXPORT";


// export const syncCustomers = (payload: CustomerList): ReduxAction => ({
export const syncExport = (expo: IExpo ) => ({
  type: SYNC_EXPORT,
  expo,
});
