export const startTimer = (
  intervalRefCurrnt: number | null,
  setTimer: React.Dispatch<React.SetStateAction<number>>
) => {
  intervalRefCurrnt = window.setInterval(() => {
    setTimer((prev: number) => {
      return prev + 1000;
    });
  }, 1000);
};

export const stopTimer = (intervalRefCurrnt: number | null) => {
  if (intervalRefCurrnt) {
    clearInterval(intervalRefCurrnt);
    intervalRefCurrnt = null;
  }
};
