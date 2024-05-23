import { ButtonHTMLAttributes } from "react";
import styles from "./CreateButton.module.scss";

function CreateButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={styles["create-button"]} {...props}></button>;
}

export default CreateButton;
