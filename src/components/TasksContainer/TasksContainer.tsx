import { useEffect, useState } from "react";
import styles from "./TasksContainer.module.scss";
import { getDateWithoutTime } from "../../helpers/getDateWithoutTime";
import { formatDate } from "../../helpers/formatDate";
import { ITask } from "../../models/ITask";
import { formatTime } from "../../helpers/formatTime";
import CreateButton from "../../UI/CreateButton/CreateButton";
import CreateForm from "../CreateForm/CreateForm";
import Modal from "../../UI/Modal/Modal";

interface TasksContainerI {
  children: React.ReactNode;
  date?: Date;
  tasks: ITask[];
}

function TasksContainer({
  children,
  date = new Date(),
  tasks,
}: TasksContainerI) {
  const [titleDate, setTitleDate] = useState<null | string>(null);
  const [headerTime, setsetHeader] = useState<null | string>(null);
  const [modal, setModal] = useState(false);

  const handleCreate = () => {
    setModal(true);
  };

  useEffect(() => {
    if (date) {
      if (getDateWithoutTime(date) === getDateWithoutTime(new Date())) {
        setTitleDate("Сегодня");
      } else {
        setTitleDate(formatDate(date));
      }
    }
  }, []);
  useEffect(() => {
    const sumTime = tasks.reduce((time: number, task: ITask) => {
      if (task.startTime && task.endTime) {
        return time + (task.endTime - task.startTime);
      } else {
        return time;
      }
    }, 0);
    if (sumTime) {
      setsetHeader(formatTime(sumTime));
    } else {
      setsetHeader("");
    }
  }, [tasks]);
  return (
    <>
      <div className={styles["tasks-container"]}>
        {titleDate && (
          <div className={styles["tasks-header"]}>
            <div className={styles["header-title"]}>
              <h1>{titleDate}</h1>
              {titleDate === "Сегодня" && (
                <CreateButton onClick={handleCreate} />
              )}
            </div>
            <h2>{headerTime}</h2>
          </div>
        )}
        {children}
      </div>
      <Modal close={() => setModal(false)} modal={modal}>
        <CreateForm close={() => setModal(false)} />
      </Modal>
    </>
  );
}

export default TasksContainer;
