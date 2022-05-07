import { ISettingsReducer } from 'types/props.types'
import { LOAD_INITIAL_SETTINGS } from "actions/settings.actions";



const initialState: ISettingsReducer = {
  expo: [],
};

const settings = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_INITIAL_SETTINGS:
      return { 
        ...state,
        expo: {
          ...action.payload
        } 
      };
    default:
      return state;
  }
};

export default settings;
