import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import style from "./modal.module.scss";

const Overlay = (props) => {
  return (
    <motion.div
      transition={{ default: { duration: 0.4 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="modal"
      onClick={props.closeModalHandler}
      className={style.overlay}
    ></motion.div>
  );
};

const Backdrop = (props) => {
  return (
    <motion.div
      transition={{ default: { duration: 0.4 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="modal"
      onClick={props.closeModalHandler}
      className={style.backdrop}
    >
      {props.children}
    </motion.div>
  );
};


const Modal = ({ children, closeModalHandler  }) => {

  return (
    <Fragment>
      {createPortal(
        <Overlay closeModalHandler={closeModalHandler} />,
        document.getElementById("__next")
      )}
      {children && (
        <>
          {createPortal(
            <Backdrop closeModalHandler={closeModalHandler}>{children}</Backdrop>,
            document.getElementById("__next")
          )}
        </>
      )}
    </Fragment>
  );
};

export default Modal;
