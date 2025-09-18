import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import portfolioReducer from "./slices/portfolioSlice";

const persistConfig = {
  key: "portfolio",
  storage,
  whitelist: ["tokens", "lastUpdated"],
};

const persistedReducer = persistReducer(persistConfig, portfolioReducer);

export const store = configureStore({
  reducer: {
    portfolio: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
