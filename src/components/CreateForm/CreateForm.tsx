import { FormEventHandler, useState } from "react";
import styles from "./CreateForm.module.scss";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { parseTimeToMilliseconds } from "../../helpers/formatTime";
import { isValidTimeFormat } from "../../helpers/isValid";
import { useAppDispatch } from "../../hooks/redux";
import { addTodayTask, setModal } from "../../store/slices/tasksSlice";

function CreateForm() {
  const [newData, setNewData] = useState({
    body: "",
    startTime: "",
    endTime: "",
  });
  const dispatch = useAppDispatch();
  const handelCreate: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const sT = parseTimeToMilliseconds(newData.startTime);
    const eT = parseTimeToMilliseconds(newData.endTime);
    if (
      newData.body.length > 0 &&
      isValidTimeFormat(newData.startTime) &&
      isValidTimeFormat(newData.endTime) &&
      sT <= eT
    ) {
      const newTask = {
        body: newData.body,
        startTime: sT,
        endTime: eT,
        date: new Date().toISOString().slice(0, 10),
        id: new Date().getTime(),
      };
      dispatch(addTodayTask(newTask));
      dispatch(setModal(false));
    } else {
      alert("Некорректные данные");
    }
  };
  return (
    <form className={styles["create"]} action="submit" onSubmit={handelCreate}>
      <h3>Добавление выполненной задачи</h3>
      <div className={styles["body"]}>
        <Input
          value={newData.body}
          type="text"
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, body: e.target.value }))
          }
        />
      </div>
      <div className={styles["time-inputs"]}>
        <Input
          value={newData.startTime}
          onChange={(e) =>
            setNewData((prev) => ({
              ...prev,
              startTime: e.target.value,
            }))
          }
        />
        <div className={styles["line"]}>-</div>
        <Input
          value={newData.endTime}
          onChange={(e) =>
            setNewData((prev) => ({
              ...prev,
              endTime: e.target.value,
            }))
          }
        />
      </div>
      <div className={styles["date"]}>
        <Input
          disabled={true}
          type="date"
          value={new Date().toISOString().slice(0, 10)}
        />
      </div>
      <Button isFill={true} type="submit">
        <>
          <div className={styles["save-button"]}></div>
          Сохранить
        </>
      </Button>
    </form>
  );
}

export default CreateForm;
