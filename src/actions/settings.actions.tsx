import { ExpoActivityList } from 'types'
export const LOAD_INITIAL_SETTINGS = "LOAD_INITIAL_SETTINGS";

export const loadInitialSettings = (payload: ExpoActivityList) => ({
  type: LOAD_INITIAL_SETTINGS,
  payload,
});