import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'

import {sagas} from './sagas'
import {reducers} from './reducers';

const sagasMiddleware = createSagaMiddleware()

const composeMiddlewares = applyMiddleware(sagasMiddleware)

// Use Redux DevTools Extension in development, also check that window exists to prevent conflicts
// with Jest testing.
const composeEnhancers = (middlewares) =>
  typeof window !== 'undefined'
    ? composeWithDevTools(middlewares)
    : compose(middlewares)

export const store = createStore(
  reducers,
  composeEnhancers(composeMiddlewares)
)

sagasMiddleware.run(sagas)