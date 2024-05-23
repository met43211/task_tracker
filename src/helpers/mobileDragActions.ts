import { Action, Dispatch } from "@reduxjs/toolkit";
import {
  changeCurrentOrder,
  setIsDragging,
  setPotentialId,
} from "../store/slices/tasksSlice";
import { ITask } from "../models/ITask";

export const touchMoveDrag = (
  touch: React.Touch,
  potentialId: number | null,
  dispatch: Dispatch<Action>
) => {
  const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
  const overed = targetElement?.closest("[data-task-id]") as HTMLElement;
  if (overed) {
    const id = Number(overed.getAttribute("data-task-id"));
    if (potentialId != id) {
      dispatch(setPotentialId(id));
    }
  }
};
export const touchEndDrag = (
  dispatch: Dispatch<Action>,
  task: ITask,
  touch: React.Touch,
  isDragging: boolean,
  touchStartRef: React.MutableRefObject<number | null>,
  touchTaskRef: React.MutableRefObject<ITask | null>
) => {
  if (touchStartRef.current && Date.now() - touchStartRef.current > 100) {
    const targetElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );
    const overTaskId =
      targetElement?.getAttribute("data-task-id") ||
      targetElement?.closest("[data-task-id]")?.getAttribute("data-task-id");
    if (targetElement && overTaskId) {
      if (touchTaskRef.current) {
        dispatch(
          changeCurrentOrder({
            current: touchTaskRef.current,
            over: { ...task, id: Number(overTaskId) },
          })
        );
      }
    }
  }
  dispatch(setPotentialId(null));
  touchStartRef.current = null;
  touchTaskRef.current = null;
  if (!isDragging) {
    dispatch(setIsDragging(true));
  }
};
