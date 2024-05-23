import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonI extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isFill?: boolean;
}

function Button({ children, isFill = false, ...props }: ButtonI) {
  return (
    <button
      className={`${styles["btn"]} ${isFill && styles["btn-fill"]}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
