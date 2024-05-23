import { useState } from "react";
import CreateButton from "../../UI/CreateButton/CreateButton";
import Input from "../../UI/Input/Input";
import PlayButton from "../../UI/PlayButton/PlayButton";
import styles from "./CreateBar.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITask } from "../../models/ITask";
import { addCurrentTask } from "../../store/slices/tasksSlice";
import Modal from "../../UI/Modal/Modal";
import ModalMessage from "../ModalMessage/ModalMessage";

function CreateBar() {
  const [taskBody, setTaskBody] = useState("");
  const [modal, setModal] = useState(false);
  const { isTimer } = useAppSelector((state) => state.tasksReducer);
  const dispatch = useAppDispatch();

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskBody.length > 0) {
      const newTask: ITask = {
        id: new Date().getTime(),
        date: new Date().toISOString().slice(0, 10),
        body: taskBody,
        startTime: null,
        endTime: null,
      };
      setTaskBody("");
      dispatch(addCurrentTask(newTask));
    }
  };
  const handlePlayTask = () => {
    if (taskBody.length > 0 && !isTimer) {
      const newTask: ITask = {
        id: new Date().getTime(),
        date: new Date().toISOString().slice(0, 10),
        body: taskBody,
        startTime: new Date().getTime(),
        endTime: null,
      };
      setTaskBody("");
      dispatch(addCurrentTask(newTask));
    } else if (taskBody.length > 0 && isTimer) {
      setModal(true);
    }
  };
  return (
    <>
      <form
        className={styles["create-bar"]}
        action={"submit"}
        onSubmit={handleCreateTask}
      >
        <Input
          onChange={(e) => {
            setTaskBody(e.target.value);
          }}
          value={taskBody}
          type="text"
        />
        <div className={styles["create-button"]}>
          <CreateButton type="submit" />
        </div>
        <div className={styles["play-button"]}>
          <PlayButton onClick={handlePlayTask} type="button" />
        </div>
      </form>
      <Modal close={() => setModal(false)} modal={modal} isMassage={true}>
        <ModalMessage>Сначала завершите текущую задачу</ModalMessage>
      </Modal>
    </>
  );
}

export default CreateBar;
