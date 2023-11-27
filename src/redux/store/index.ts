import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {reducer} from '../reducers';
import createSagaMiddleware from 'redux-saga';
import {rootInitialSaga} from '../saga';

const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootInitialSaga);

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;