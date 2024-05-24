import { IPassedTask, ITask } from "../../models/ITask";

export const sortPassedTasks = (passedTasks: IPassedTask[]) => {
  passedTasks.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  passedTasks.forEach((item) => sortTodayTasks(item.tasks));
  return passedTasks;
};

export const sortTodayTasks = (todayTasks: ITask[]) => {
  todayTasks.sort((a, b) => {
    if (a.startTime && b.startTime) {
      return b.startTime - a.startTime;
    }
    return 0;
  });
};
