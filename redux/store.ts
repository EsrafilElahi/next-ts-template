import { configureStore, combineReducers, Action, ThunkAction, AnyAction, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import { compose } from 'redux';
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { counterSlice } from './slices/counterSlice'
import { userSlice } from './slices/userSlice';


const makeStore = () => {
  const isServer = typeof window === 'undefined';
  let store;

  const combinedReducers = combineReducers({
    counterReducer: counterSlice.reducer,
    userReducer: userSlice.reducer,
  })

  if (isServer) {
    store = configureStore({
      reducer: combinedReducers,
      middleware: [thunk],
      devTools: process.env.NODE_ENV !== 'production',
      // middleware: (getDefaultMiddleware) =>
      //   getDefaultMiddleware({
      //     serializableCheck: {
      //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //     },
      //   }),
    })

    return store
  } else {

    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage
    }

    const rootReducer = (state: ReturnType<typeof combinedReducers>, action: AnyAction) => {
      if (action.type === HYDRATE) {
        const nextState = {
          ...state,
          ...action.payload,
        };
        return nextState;
      }
      return combinedReducers(state, action);
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    store = configureStore({
      reducer: persistedReducer,
      middleware: [thunk],
      devTools: process.env.NODE_ENV !== 'production',
      // middleware: (getDefaultMiddleware) =>
      //   getDefaultMiddleware({
      //     serializableCheck: {
      //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //     },
      //   }),
    })

    store.__persistor = persistStore(store); // Nasty hack
  }

  return store
}

// simple way
// export const store = makeStore()
// export const persistor = persistStore(store)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch


// isServer isClient way
type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export const wrapper = createWrapper(makeStore, { debug: true });
