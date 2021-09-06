import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
import contactsReducer from "./contacts/contacts-reducers";
import { contactAPI } from "services/contactAPI";

const middleware = [...getDefaultMiddleware(), logger, contactAPI.middleware];

const store = configureStore({
  reducer: {
    phonebook: contactsReducer,
    [contactAPI.reducerPath]: contactAPI.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware,
});

setupListeners(store.dispatch);

export { store };