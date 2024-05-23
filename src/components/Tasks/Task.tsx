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
  setIsDragging,
  setIsTimer,
  setPickedTask,
  setPotentialId,
} from "../../store/slices/tasksSlice";
import PlayButton from "../../UI/PlayButton/PlayButton";
import { startTimer, stopTimer } from "../../helpers/timer";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../helpers/localStorageHelpers";
import { handleStartTask, handleStopTask } from "../../helpers/taskActions";
import { touchEndDrag, touchMoveDrag } from "../../helpers/mobileDragActions";

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
  const touchStartRef = useRef<number | null>(null);
  const touchTaskRef = useRef<ITask | null>(null);

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

  const handleTouchStartDrag: TouchEventHandler<HTMLDivElement> = () => {
    touchStartRef.current = Date.now();
    touchTaskRef.current = task;
    dispatch(setIsDragging(true));
  };

  const handleTouchMoveDrag: TouchEventHandler<HTMLDivElement> = (e) => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
    const touch = e.changedTouches[0];
    touchMoveDrag(touch, potentialId, dispatch);
  };

  const handleTouchEndDrag: TouchEventHandler<HTMLDivElement> = (e) => {
    const touch = e.changedTouches[0];
    touchEndDrag(
      dispatch,
      task,
      touch,
      isDragging,
      touchStartRef,
      touchTaskRef
    );
  };

  const handleTouchCancelDrag = () => {
    dispatch(setPotentialId(null));
    touchStartRef.current = null;
    touchTaskRef.current = null;
    if (!isDragging) {
      dispatch(setIsDragging(true));
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
      const localTimer = Number(getFromLocalStorage("timer"));
      if (localTimer) {
        setTimer(localTimer);
      }
      dispatch(setIsTimer(true));
      startTimer(intervalRef, setTimer);
    }
    return () => {
      stopTimer(intervalRef);
    };
  }, [startTime, endTime]);

  useEffect(() => {
    if (startTime && !endTime) {
      saveToLocalStorage("timer", timer);
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
        <div
          className={styles["drag"]}
          onTouchStart={handleTouchStartDrag}
          onTouchMove={handleTouchMoveDrag}
          onTouchEnd={handleTouchEndDrag}
          onTouchCancel={handleTouchCancelDrag}
        ></div>
      )}
    </div>
  );
}

export default Task;
