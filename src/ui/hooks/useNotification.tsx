import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNoti, showNoti } from "redux/notificationSlice";
import { RootState } from "redux/store";

export const useNotification = () => {
  const [timeHidden, setTimeHidden] = useState(3000);
  const notificationhState = useSelector(
    (state: RootState) => state.Notification
  );
  const dispatch = useDispatch();

  const showNotification = (type: string, message: string) => {
    dispatch(showNoti({ type: type, message: message }));
  };

  const hideNotification = (time: number) => {
    setTimeout(() => {
      dispatch(hideNoti())
    },time)
  }

  return {
    visible: notificationhState.visible,
    type: notificationhState.type,
    message: notificationhState.message,
    hideNotification,
    showNotification,
    timeHidden,
  };
};
