import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./ui/todo/todoSlice";

const rootReducer = combineReducers({
  todoList: todoListReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
