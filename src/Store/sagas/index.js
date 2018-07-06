import { call, takeEvery, all, put } from "redux-saga/effects";
import axios from "axios";
import { FETCH_DATA, SET_DATA, FETCH_DATA_FAILED, ERROR } from "../../types";
import { API, DEFAULT_HEADERS } from "../../constants";

function getArtists() {
  const instance = axios.create({
    baseURL: API,
    headers: { ...DEFAULT_HEADERS }
  });
  return instance.get();
}

function* fetchData() {
  try {
    const response = yield call(getArtists);
    const data = yield response.data;
    yield put({ type: SET_DATA, payload: data });
  } catch (e) {
    yield put({ type: FETCH_DATA_FAILED, payload: e });
    yield put({ type: ERROR, payload: e });
    console.log(e);
  }
}

export function* home() {
  yield takeEvery(FETCH_DATA, fetchData);
}

export function* sagas() {
  yield all([home()]);
}
