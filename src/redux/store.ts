import AuthReducer from "apps/UserAccount/redux/userSlice";

import { configureStore } from "@reduxjs/toolkit";

import boardSlice from "apps/Board/redux/boardSlice";
import pinSlice from "apps/Pin/redux/pinSlice";
import notificationSlice from "redux/notificationSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Notification: notificationSlice,
    Board: boardSlice,
    Pin:pinSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
