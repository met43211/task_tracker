import { useState } from "react";
import { ITask } from "../../models/ITask";
import Task from "./Task";
import styles from "./Tasks.module.scss";
import Modal from "../../UI/Modal/Modal";
import { setEditModal } from "../../store/slices/tasksSlice";
import EditForm from "../EditForm/EditForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface TasksI {
  tasks: ITask[];
}

function TasksList({ tasks }: TasksI) {
  const [currentTask, setCurrentTask] =
    useState<React.SetStateAction<null | ITask>>(null);
  const dispatch = useAppDispatch();
  const { editModal, pickedTask } = useAppSelector(
    (state) => state.tasksReducer
  );
  return (
    <>
      <div className={styles["tasks"]}>
        {tasks.map((task, index) => (
          <Task
            {...task}
            key={task.id}
            order={index + 1}
            current={currentTask}
            setCurrentTask={setCurrentTask}
          />
        ))}
      </div>
      <Modal close={() => dispatch(setEditModal(false))} modal={editModal}>
        {pickedTask && <EditForm {...pickedTask}></EditForm>}
      </Modal>
    </>
  );
}

export default TasksList;
