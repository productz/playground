import { FETCH_DATA, SET_DATA } from "../../types";

// Reset the store by passing undefined as the state.
export const reducers = (state, action) => {
  if (action.type === "@@INIT") {
    return [];
  }
  if (action.type === FETCH_DATA) {
    return state;
  }
  if (action.type === SET_DATA) {
    return [...action.payload];
  }
};
