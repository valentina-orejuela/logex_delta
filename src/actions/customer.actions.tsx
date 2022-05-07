import { CustomerList } from "types/props.types";

// export interface ReduxAction {
//     type: string;
//     payload: CustomerList
// }


export const SYNC_CLIENTES = "SYNC_CLIENTES";


// export const syncCustomers = (payload: CustomerList): ReduxAction => ({
export const syncCustomers = (payload: CustomerList) => ({
  type: SYNC_CLIENTES,
  payload,
});
