export const formatDuration = (startTime: number, endTime: number): string => {
  const formatTime = (timeInMilliseconds: number): string => {
    const date = new Date(timeInMilliseconds);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return `${formattedStartTime} - ${formattedEndTime}`;
};
