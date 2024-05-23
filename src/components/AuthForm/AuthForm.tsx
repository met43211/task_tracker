import { FormEvent, useState } from "react";
import styles from "./AuthForm.module.scss";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "../../helpers/localStorageHelpers";

function AuthForm({ openModal }: { openModal: () => void }) {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.authReducer);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user.login === formData.login && user.password === formData.password) {
      saveToLocalStorage("isAuth", true);
      navigate("/task_tracker");
    } else {
      openModal();
    }
  };

  return (
    <form action="submit" onSubmit={handleSubmit} className={styles["form"]}>
      <Input
        placeholder={"Введите логин"}
        type="text"
        value={formData.login}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, login: e.target.value }));
        }}
      />
      <div className={styles["password"]}>
        <Input
          placeholder={"Введите пароль"}
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <div
          className={`${styles["show-icon"]} ${
            showPassword ? styles["hide"] : styles["show"]
          }`}
          onClick={() => setShowPassword((prev) => !prev)}
        ></div>
      </div>
      <Button type="submit" isFill={true}>
        Войти
      </Button>
    </form>
  );
}

export default AuthForm;
