import { InputHTMLAttributes, useRef } from "react";
import styles from "./Input.module.scss";
import { formatInputDate } from "../../helpers/formatDate";

function Input({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateIconClick = () => {
    if (dateInputRef.current && props.type === "date") {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className={styles["field"]}>
      <input
        onClick={handleDateIconClick}
        className={styles["input"]}
        {...props}
        ref={props.type === "date" ? dateInputRef : null}
        id={props.type === "date" ? "date" : ""}
      />
      {props.type === "date" && (
        <div className={styles["date"]} onClick={handleDateIconClick}>
          {formatInputDate(props.value)}
        </div>
      )}
      {props.type === "date" && (
        <div
          className={styles["date-icon"]}
          onClick={handleDateIconClick}
        ></div>
      )}
    </div>
  );
}

export default Input;
