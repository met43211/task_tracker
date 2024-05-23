import { ButtonHTMLAttributes } from "react";
import styles from "./StopButton.module.scss";

function StopButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={styles["stop-button"]} {...props}></button>;
}

export default StopButton;
