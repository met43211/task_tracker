import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setModal,
  setModalComponent,
  setShowMore,
} from "../../store/slices/tasksSlice";
import ChangeUserForm from "../ChangeUserForm/ChangeUserForm";
import styles from "./Footer.module.scss";

function Footer() {
  const { user } = useAppSelector((state) => state.authReducer);
  const { showMore } = useAppSelector((state) => state.tasksReducer);
  const dispatch = useAppDispatch();
  return (
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
          dispatch(setModalComponent(<ChangeUserForm {...user} />));
          dispatch(setModal(true));
        }}
      >
        <div className={`${styles["icon"]} ${styles["user"]}`}></div>
        {user.login}
      </button>
    </div>
  );
}

export default Footer;
