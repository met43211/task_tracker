import { FormEventHandler, useState } from "react";
import Input from "../../UI/Input/Input";
import { ITask } from "../../models/ITask";
import styles from "./EditForm.module.scss";
import { formatInputTime, formatTime } from "../../helpers/formatTime";
import Button from "../../UI/Button/Button";
import { useAppDispatch } from "../../hooks/redux";
import { isDateValid } from "../../helpers/isValid";
import { deleteTask, editTask } from "../../helpers/editModalActions";
import { setEditModal } from "../../store/slices/tasksSlice";

function EditForm({ ...task }: ITask) {
  const [newData, setNewData] = useState({
    ...task,
    startTime: formatInputTime(task.startTime || 0),
    endTime: formatInputTime(task.endTime || 0),
  });
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    deleteTask(dispatch, task);
    dispatch(setEditModal(false));
  };

  const handelEdit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    editTask(dispatch, task, newData);
  };

  return (
    <form className={styles["edit"]} action="submit" onSubmit={handelEdit}>
      <h3>Редактирование задачи</h3>
      <div className={styles["body"]}>
        <Input
          placeholder="Текст задачи"
          value={newData.body}
          type="text"
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, body: e.target.value }))
          }
        />
      </div>
      {task.endTime && task.startTime && (
        <div className={styles["time-inputs"]}>
          <div className={styles["inputs"]}>
            <Input
              placeholder="чч:мм"
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
              placeholder="чч:мм"
              value={newData.endTime}
              onChange={(e) =>
                setNewData((prev) => ({
                  ...prev,
                  endTime: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles["time"]}>
            {formatTime(task.endTime - task.startTime)}
          </div>
        </div>
      )}
      <div className={styles["date"]}>
        <Input
          disabled={!task.endTime}
          type="date"
          value={newData.date}
          onChange={(e) => {
            const selectedDate = e.target.value;
            if (isDateValid(selectedDate)) {
              setNewData((prev) => ({
                ...prev,
                date: selectedDate,
              }));
            } else {
              console.log("Нельзя выбрать будущую дату");
            }
          }}
        />
      </div>
      <div className={styles["btns"]}>
        <Button isFill={true} type="submit">
          <>
            <div className={styles["save-button"]}></div>
            Сохранить
          </>
        </Button>
        <Button type="button" id="delete-btn" onClick={handleDelete}>
          <>
            <div className={styles["delete-button"]}></div>
            Удалить
          </>
        </Button>
      </div>
    </form>
  );
}

export default EditForm;
