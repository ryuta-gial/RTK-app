import { configureStore } from "@reduxjs/toolkit";
// Services
import { todoApi } from "services/toDoApi";
// Slice reducers
import todoReducer from "slices/todoSlice";

export const toDoStore = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    todoState: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof toDoStore.getState>;
export type AppDispatch = typeof toDoStore.dispatch;
