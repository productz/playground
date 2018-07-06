import { ERROR } from "../../types";

export const errors = (state = {}, action) => {
  if (action.type === ERROR) {
    return action.payload;
  }
  return state;
};
