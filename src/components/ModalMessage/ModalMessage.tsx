import styles from "./ModalMessage.module.scss";

function ModalMessage({ children }: { children: React.ReactNode }) {
  return <div className={styles["modal-message"]}>{children}</div>;
}

export default ModalMessage;
