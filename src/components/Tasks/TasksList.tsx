import { useState } from "react";
import { ITask } from "../../models/ITask";
import Task from "./Task";
import styles from "./Tasks.module.scss";

interface TasksI {
  tasks: ITask[];
}

function TasksList({ tasks }: TasksI) {
  const [currentTask, setCurrentTask] =
    useState<React.SetStateAction<null | ITask>>(null);
  return (
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
  );
}

export default TasksList;
