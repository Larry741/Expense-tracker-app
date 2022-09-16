import { useState } from "react";

import classes from "./Navbar.module.scss";
// import Modal from "../UI/modal";
import AuthForm from "../Auth/AuthForm";
import { signOut, useSession } from "next-auth/react";

const Navbar = (props) => {
  const [toggleLoginModal, setToggleLoginModal] = useState(false);
  const { data: session, status } = useSession();

  const closeModalHandler = (event) => {
    if (event.target.id !== "modal") {
      return
    } 
    setToggleLoginModal((prevState) => !prevState);
  };
  const closeModalHlr = (event) => {
    setToggleLoginModal((prevState) => !prevState);
  };

  return (
    <>
      {toggleLoginModal ? (
        <Modal closeModalHandler={closeModalHandler}>
          <AuthForm closeModalHandler={closeModalHlr} />
        </Modal>
      ) : null}
      <div id="navBar" className={`${classes.navbar}`}>
        <div className={classes["box"]}>
          {session && <h2 className="primaryText-bold">
            Welcome
            <span> {session.user.name}</span>
          </h2>}
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
