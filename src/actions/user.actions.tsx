import {IUser} from 'types'

export const LOAD_USER = "LOAD_USER";


// export const syncCustomers = (payload: CustomerList): ReduxAction => ({
export const loadUser = (payload: IUser) => ({
  type: LOAD_USER,
  payload,
});