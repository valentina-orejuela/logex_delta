import {IUser, RoleName} from 'types'

import { LOAD_USER } from 'actions/user.actions'

const initialState: IUser = {
    email: '',
    first_name: '',
    second_name: '',
    first_lastname: '',
    second_lastname: '',
    company_name: '',
    company_id: '',
    role: RoleName.ADMIN,
} 

const users =  (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_USER: 
      return {...state, ...action.payload};
    default: return state;
  }
}

export default users;
