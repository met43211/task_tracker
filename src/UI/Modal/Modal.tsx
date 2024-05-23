import styles from "./Modal.module.scss";
import { useEffect } from "react";

interface ModalI {
  children: React.ReactNode | null;
  modal: boolean;
  close: () => void;
}

function Modal({ children, close, modal }: ModalI) {
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  if (!modal) {
    return null;
  }

  return (
    <>
      <div className={styles["modal-cover"]} onClick={close}></div>
      <div className={styles["modal"]}>
        <div onClick={close} className={styles["close"]} />
        {children}
      </div>
    </>
  );
}

export default Modal;
