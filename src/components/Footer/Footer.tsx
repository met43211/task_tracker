import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setShowMore } from "../../store/slices/tasksSlice";
import ChangeUserForm from "../ChangeUserForm/ChangeUserForm";
import styles from "./Footer.module.scss";
import Modal from "../../UI/Modal/Modal";

function Footer() {
  const [modal, setModal] = useState(false);
  const { user } = useAppSelector((state) => state.authReducer);
  const { showMore } = useAppSelector((state) => state.tasksReducer);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className={styles["footer"]}>
        {!showMore ? (
          <button
            className={styles["btn"]}
            onClick={() => {
              dispatch(setShowMore(true));
            }}
          >
            <div className={`${styles["icon"]} ${styles["show-more"]}`}></div>
            Загрузить ещё
          </button>
        ) : (
          <button
            className={styles["btn"]}
            onClick={() => {
              dispatch(setShowMore(false));
            }}
          >
            <div className={`${styles["icon"]} ${styles["only-today"]}`}></div>
            Только сегодня
          </button>
        )}

        <button
          className={styles["btn"]}
          onClick={() => {
            setModal(true);
          }}
        >
          <div className={`${styles["icon"]} ${styles["user"]}`}></div>
          {user.login}
        </button>
      </div>
      <Modal close={() => setModal(false)} modal={modal}>
        <ChangeUserForm {...user} />
      </Modal>
    </>
  );
}

export default Footer;
