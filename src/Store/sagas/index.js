// Frequently we need some certainty of certain data, authentication state for example, before
// we can properly run our sagas. This init blocks execution of any forks after, giving us a
// place to run whatever checks we need before proceeding.
import { FETCH_DATA, SET_DATA } from "../../types";
import { call, take, takeEvery, all, put } from "redux-saga/effects";
import axios from "axios";
import { API, DEFAULT_HEADERS } from "../../constants";

// Our SUBMIT_LOGIN action passes along the form values as the payload and form actions as
// meta data. This allows us to not only use the values to do whatever API calls and such
// we need, but also to maintain control flow here in our saga.
function getArtists() {
  // Make a request for a user with a given ID
  // axios.default.headers.common["ws-api"] = 2.1;
  const instance = axios.create({
    baseURL: API,
    headers: { ...DEFAULT_HEADERS }
  });
  return instance.get();
}

function* fetchData() {
  try {
    // Connect to our "API" and get an API token for future API calls.
    const response = yield call(getArtists);
    const data = yield response.data;
    yield put({ type: SET_DATA, payload: data });
  } catch (e) {
    console.log(e);
    // If our API throws an error we will leverage Formik's existing error system to pass it along
    // to the view layer, as well as clearing the loading indicator.
  }
}

export function* home() {
  yield console.log("hello init!");
  yield takeEvery(FETCH_DATA, fetchData);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* sagas() {
  yield all([home()]);
}
