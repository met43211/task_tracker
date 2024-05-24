import { TouchEventHandler, useRef } from "react";
import { touchEndDrag, touchMoveDrag } from "../../helpers/mobileDragActions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setIsDragging, setPotentialId } from "../../store/slices/tasksSlice";
import styles from "./MobileDrag.module.scss";
import { ITask } from "../../models/ITask";

interface MobileDragI {
  task: ITask;
  holdTimeout: React.MutableRefObject<number | null>;
}

function MobileDrag({ task, holdTimeout }: MobileDragI) {
  const touchStartRef = useRef<number | null>(null);
  const touchTaskRef = useRef<ITask | null>(null);

  const { isDragging, potentialId } = useAppSelector(
    (state) => state.tasksReducer
  );

  const dispatch = useAppDispatch();

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

  return (
    <div
      className={styles["drag"]}
      onTouchStart={handleTouchStartDrag}
      onTouchMove={handleTouchMoveDrag}
      onTouchEnd={handleTouchEndDrag}
      onTouchCancel={handleTouchCancelDrag}
    ></div>
  );
}

export default MobileDrag;
