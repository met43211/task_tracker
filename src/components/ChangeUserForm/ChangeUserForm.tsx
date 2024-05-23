import { FormEventHandler, useState } from "react";
import styles from "./ChangeUserForm.module.scss";
import { IUser } from "../../models/IUser";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { useAppDispatch } from "../../hooks/redux";
import { saveToLocalStorage } from "../../helpers/localStorageHelpers";
import { setUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function ChangeUserForm({ ...user }: IUser) {
  const [newUser, setNewUser] = useState(user);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (newUser.login.length > 2 && newUser.password.length > 8) {
      dispatch(setUser(newUser));
    } else {
      alert("Некорректные данные");
    }
    //dispatch(setModal(false));
  };
  const handleLogOut = () => {
    saveToLocalStorage("isAuth", false);
    navigate("/task_tracker/auth");
    //dispatch(setModal(false));
  };
  return (
    <form action="submit" onSubmit={handleChange} className={styles["change"]}>
      <h3>Редактирование профиля</h3>
      <Input
        value={newUser.login}
        type="text"
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, login: e.target.value }))
        }
      />
      <div className={styles["password"]}>
        <Input
          value={newUser.password}
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <div
          className={`${styles["show-icon"]} ${
            showPassword ? styles["hide"] : styles["show"]
          }`}
          onClick={() => setShowPassword((prev) => !prev)}
        ></div>
      </div>
      <div className={styles["btns"]}>
        <Button isFill={true} type="submit">
          <>
            <div className={styles["save-button"]}></div>
            Сохранить
          </>
        </Button>
        <Button type="button" onClick={handleLogOut}>
          <>
            <div className={styles["log-out"]}></div>
            Выйти
          </>
        </Button>
      </div>
    </form>
  );
}

export default ChangeUserForm;
