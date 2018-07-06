import { combineReducers } from "redux";
import {errors} from "./errors";
import {art} from "./art";
export default combineReducers({
  art,
  errors
})