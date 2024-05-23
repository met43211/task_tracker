// export const startTimer = (
//   intervalRefCurrent: number | null,
//   setTimer: React.Dispatch<React.SetStateAction<number>>
// ) => {
//   intervalRefCurrent = window.setInterval(() => {
//     setTimer((prev: number) => {
//       return prev + 1000;
//     });
//   }, 1000);
// };

// export const stopTimer = (intervalRefCurrent: number | null) => {
//   if (intervalRefCurrent) {
//     clearInterval(intervalRefCurrent);
//     intervalRefCurrent = null;
//   }
// };
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
