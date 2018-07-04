import { FETCH_DATA } from "../../types";

const appReducer = state => state;

// Reset the store by passing undefined as the state.
export const reducers = (state, action) => {
  if(action.type === "@@INIT"){
    return [];
  }
  return action.type === FETCH_DATA
    ? appReducer([], action)
    : appReducer(state, action);
};
