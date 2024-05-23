import { Dispatch, SetStateAction } from "react";

export const startTimer = (
  intervalRef: React.MutableRefObject<number | null>,
  setTimer: Dispatch<SetStateAction<number>>
) => {
  intervalRef.current = window.setInterval(() => {
    setTimer((prev) => prev + 1000);
  }, 1000);
};

export const stopTimer = (
  intervalRef: React.MutableRefObject<number | null>
) => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
};
