import { FETCH_DATA } from "../../types";

const appReducer = state => state;

// Reset the store by passing undefined as the state.
export const reducers = (state, action) => {
  return action.type === FETCH_DATA
    ? appReducer(undefined, action)
    : appReducer(state, action);
};
