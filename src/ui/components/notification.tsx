import { useNotification } from "../hooks/useNotification";
import { useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
  //@ts-ignore
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Notification = () => {
  const { visible, type, message, hideNotification, timeHidden } =
  useNotification();
  useEffect(() => {
    hideNotification(3000);
    if (visible) {
      if (type === "Success") {
        NotificationManager.success(type, message);
      } else {
        NotificationManager.error(type, message);
      }
    }
  }, [visible]);

  return (
    //@ts-ignore
    <div className="example-component">
      <NotificationContainer className="custom-notification-container" />
    </div>
  );
};

export default Notification;
