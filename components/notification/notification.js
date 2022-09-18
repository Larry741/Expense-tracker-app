import { useRef } from "react";
import { createPortal } from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

import styles from "./notification.module.scss";

const NotificationDom = ({ children, successState, closeNotification }) => {
  const notificationRef = useRef();

  return (
    <span ref={notificationRef} className={`${styles.notification} small-text`}>
      <span className="mediumSmallText">{children}</span>
      <span onClick={closeNotification} className={styles[`${successState}`]}>
        {successState !== "success" ? <IoCloseSharp /> : <FaCheck />}
      </span>
    </span>
  );
};

const Notification = ({ children, successState, closeNotification }) => {
  return (
    <>
      {createPortal(
        <NotificationDom
          closeNotification={closeNotification}
          successState={successState}
        >
          {children}
        </NotificationDom>,
        document.body
      )}
    </>
  );
};

export default Notification;
