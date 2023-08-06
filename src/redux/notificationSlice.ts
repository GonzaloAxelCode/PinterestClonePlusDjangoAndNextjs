import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
type TypeNotification  = "Success" | "Fail" | "Warning" | "undefined"
interface NotificationState {
  type: TypeNotification;
  message: string;
  visible: boolean;
}

const initialState: NotificationState = {
  type: "Success",
  message: "",
  visible: false,
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNoti: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.visible = true;
    },
    hideNoti: (state) => {
      state.visible = false;
    },
  },
});

export const { hideNoti, showNoti } = notificationSlice.actions;

export default notificationSlice.reducer;
