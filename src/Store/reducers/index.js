import { STORE_RESET } from "types";

const appReducer = state => state;

// Reset the store by passing undefined as the state.
export const reducers = (state, action) => {
  return action.type === STORE_RESET
    ? appReducer(undefined, action)
    : appReducer(state, action);
};
