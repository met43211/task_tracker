import {
  DragEventHandler,
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { formatDuration } from "../../helpers/formatDuration";
import { ITask } from "../../models/ITask";
import styles from "./Tasks.module.scss";
import { formatTime } from "../../helpers/formatTime";
import { formatTimer } from "../../helpers/formatTimer";
import StopButton from "../../UI/StopButton/StopButton";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  changeCurrentOrder,
  setEditModal,
  setIsTimer,
  setPickedTask,
} from "../../store/slices/tasksSlice";
import PlayButton from "../../UI/PlayButton/PlayButton";
import { startTimer, stopTimer } from "../../helpers/timer";
import { handleStartTask, handleStopTask } from "../../helpers/taskActions";
import MobileDrag from "../MobileDrag/MobileDrag";

interface TaskI extends ITask {
  current: React.SetStateAction<ITask | null>;
  setCurrentTask: React.Dispatch<React.SetStateAction<null | ITask>>;
}

function Task({
  body,
  startTime,
  endTime,
  id,
  date,
  current,
  setCurrentTask,
}: TaskI) {
  const task = { body, startTime, endTime, id, date };
  const [duration, setDuration] = useState("");
  const [timer, setTimer] = useState(0);
  const [timerText, setTimerText] = useState("");
  const holdTimeout = useRef<number | null>(null);

  const { isTimer, potentialId, isDragging } = useAppSelector(
    (state) => state.tasksReducer
  );
  const dispatch = useAppDispatch();
  const intervalRef = useRef<number | null>(null);

  const handleStart: MouseEventHandler<HTMLButtonElement> = (e) => {
    handleStartTask(dispatch, id, isTimer);
    e.stopPropagation();
  };

  const handleStop: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (startTime) {
      handleStopTask(
        dispatch,
        timer,
        body,
        startTime,
        id,
        setTimer,
        intervalRef,
        date
      );
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = () => {
    holdTimeout.current = window.setTimeout(() => {
      handleEdit(true);
    }, 800);
  };

  const handleTouchEnd = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };

  const handleEdit = (isLong?: boolean) => {
    if (window.innerWidth > 768 || isLong) {
      dispatch(setPickedTask(task));
      dispatch(setEditModal(true));
    }
  };

  const dragStartHandler = () => {
    setCurrentTask(task);
  };
  const dragOverHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };
  const dropHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    dispatch(changeCurrentOrder({ current, over: task }));
  };

  useEffect(() => {
    if (startTime && endTime) {
      setDuration(formatDuration(startTime, endTime));
      setTimerText(formatTime(endTime - startTime));
    } else if (startTime && !endTime) {
      const localTimer = new Date().getTime() - startTime;
      setTimer(localTimer);
      dispatch(setIsTimer(true));
      startTimer(intervalRef, setTimer);
    }
    return () => {
      stopTimer(intervalRef);
    };
  }, [startTime, endTime]);

  useEffect(() => {
    if (startTime && !endTime) {
      setTimerText(formatTimer(timer));
      setDuration(formatDuration(startTime, new Date().getTime()));
    }
  }, [timer]);

  useEffect(() => {
    if (potentialId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [potentialId]);

  return (
    <div
      className={`${styles["task"]} ${
        startTime && endTime ? styles["completed"] : styles["current"]
      } ${potentialId === task.id && !endTime && styles["potential"]}`}
      onDragStart={dragStartHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      draggable={!endTime && true}
      onClick={() => !isDragging && handleEdit()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-task-id={id}
    >
      <div className={styles["body"]}>{body}</div>
      {timerText ? (
        <div className={styles["duration"]}>{duration}</div>
      ) : (
        <div className={styles["start-timer"]}>
          <PlayButton onClick={handleStart} />
        </div>
      )}
      {timerText && (
        <>
          <div className={styles["timer"]}>{timerText}</div>
          <div className={styles["stop-timer"]}>
            <StopButton onClick={handleStop} />
          </div>
        </>
      )}
      {!endTime && !startTime && (
        <MobileDrag task={task} holdTimeout={holdTimeout} />
      )}
    </div>
  );
}

export default Task;
