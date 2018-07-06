import { FETCH_DATA, SET_DATA } from "../../types";

export const art = (state = [], action) => {
  if (action.type === SET_DATA) {
    return [...action.payload];
  }
  return state;
};