// Frequently we need some certainty of certain data, authentication state for example, before
// we can properly run our sagas. This init blocks execution of any forks after, giving us a
// place to run whatever checks we need before proceeding.
import {FETCH_DATA} from '../../types';
import {call, takeLatest} from 'redux-saga/effects'

// Our SUBMIT_LOGIN action passes along the form values as the payload and form actions as
// meta data. This allows us to not only use the values to do whatever API calls and such
// we need, but also to maintain control flow here in our saga.
function* fetchData({ payload: values, meta: actions }) {
  try {
    // Connect to our "API" and get an API token for future API calls.
    const response = yield call(loginAPI, values.username, values.password);
    yield call(storeToken, response);
  } catch (e) {
    // If our API throws an error we will leverage Formik's existing error system to pass it along
    // to the view layer, as well as clearing the loading indicator.
    yield call(setErrors, { authentication: e.message });
    yield call(setSubmitting, false);
  }
}

export function* init() {
  yield console.log("hello init!");
  yield takeLatest(FETCH_DATA, fetchData);
}

export function* sagas() {
  yield call(init);
}
