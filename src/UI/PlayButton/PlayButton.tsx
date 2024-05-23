import { ButtonHTMLAttributes } from "react";
import styles from "./PlayButton.module.scss";

function PlayButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={styles["play-button"]} {...props}></button>;
}

export default PlayButton;
