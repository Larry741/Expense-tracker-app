import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import classes from "./Navbar.module.scss";
import Modal from "../UI/Modal";
import AuthForm from "../Auth/AuthForm";
import { signOut, useSession } from "next-auth/react";
import Notification from "../notification/notification";

let notificationTimeout;

const Navbar = (props) => {
  const [toggleLoginModal, setToggleLoginModal] = useState(false);
  const { data: session, status } = useSession();
  const [showNotification, setShowNotification] = useState({
    message: null,
    successState: null,
  });

  const closeModalHandler = (event) => {
    if (event.target.id !== "modal") {
      return;
    }
    setToggleLoginModal((prevState) => !prevState);
  };
  const closeModalHlr = (event) => {
    setToggleLoginModal((prevState) => !prevState);
  };

  const closeNotification = () => {
    clearTimeout(notificationTimeout);
    setShowNotification({
      message: null,
      successState: null,
    });
  };

  const showNot = (notification) => {
    setShowNotification(notification);

    clearTimeout(notificationTimeout);

    notificationTimeout = setTimeout(() => {
      setShowNotification({
        message: null,
        successState: null,
      });
    }, 6000);
  }

  return (
    <>
      {showNotification.message && (
        <Notification
          closeNotification={closeNotification}
          successState={showNotification.successState}
        >
          <span>{showNotification.message}</span>
        </Notification>
      )}
      <AnimatePresence>
        {toggleLoginModal ? (
          <Modal closeModalHandler={closeModalHandler}>
            <AuthForm showNot={showNot} closeModalHandler={closeModalHlr} />
          </Modal>
        ) : null}
      </AnimatePresence>
      <div id="navBar" className={`${classes.navbar}`}>
        <div className={classes["box"]}>
          {session && (
            <h2 className="primaryText-bold">
              Welcome
              <span> {session.user.name}</span>
            </h2>
          )}
        </div>
        <button
          className="small-text"
          onClick={() => {
            if (!session) {
              setToggleLoginModal(true);
            } else {
              signOut();
            }
          }}
        >
          {!session ? "login" : "Logout"}
        </button>
      </div>
      <div className={classes.clearFix}></div>
    </>
  );
};

export default Navbar;
