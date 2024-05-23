import { IPassedTask, ITask } from "../../models/ITask";

export const addPassedTask = (passedTasks: IPassedTask[], task: ITask) => {
  const newTask = task;
  const { date } = newTask;
  const dateIndex = passedTasks.findIndex((passedTask) => {
    return passedTask.date === date;
  });
  if (dateIndex !== -1) {
    passedTasks[dateIndex].tasks.push(newTask);
  } else {
    passedTasks.push({
      date,
      tasks: [newTask],
    });
  }
};
