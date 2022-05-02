import { SYNC_EXPORT } from 'actions/exportaciones.actions'
import { ExpoList } from 'types/props.types';

type Action = {
  type: string;
}

export default function (state: ExpoList = {}, action: any) {
  switch (action.type) {
    case "INITIAL_LOAD": 
      return {...state, ...action.exportaciones};
    case SYNC_EXPORT:
      return {...state, ...action.expo}
    default: return state;
  }
}
