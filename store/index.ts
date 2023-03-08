import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { collegeReducer } from "./college";
import { newsReducer } from "./news";
import {
  visionMissionReducer,
  historicalBackgroundReducer,
  factAndFigureReducer,
} from "./university";

const store = configureStore({
  reducer: {
    college: collegeReducer,
    news: newsReducer,
    visionMission: visionMissionReducer,
    historicalBackground: historicalBackgroundReducer,
    factAndFigure: factAndFigureReducer,
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
