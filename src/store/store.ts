import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alertReducer from "@/store/alertSlice";
import aboutReducer from "@/store/aboutSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const combinedReducers = combineReducers({
  alert: alertReducer,
  about: aboutReducer
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: combinedReducers,
});

type DispatchFunc = () => AppDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useStateDispatch: DispatchFunc = useDispatch;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
