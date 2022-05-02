import { CustomerList } from "types/props.types";
// import { SYNC_CLIENTES, ReduxAction } from 'actions/customer.actions';
import { SYNC_CLIENTES } from 'actions/customer.actions';

// const customers =  (state: CustomerList = {}, action: ReduxAction) => {
const customers =  (state: CustomerList = {}, action: any) => {
  switch (action.type) {
    case SYNC_CLIENTES: 
      return {...state, ...action.payload};
    default: return state;
  }
}

export default customers;
