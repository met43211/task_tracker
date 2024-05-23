import { IPassedTask, ITask } from "../../models/ITask";

function sortByStartTime(tasks: ITask[]) {
  tasks.sort((a, b) => {
    if (a.startTime && b.startTime) {
      return b.startTime - a.startTime;
    } else {
      return 0;
    }
  });
}

export const sortPassedTasks = (passedTasks: IPassedTask[]) => {
  passedTasks.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  passedTasks.forEach((item) => sortByStartTime(item.tasks));
};

export const sortTodayTasks = (todayTasks: ITask[]) => {
  todayTasks.sort((a, b) => {
    if (a.startTime && b.startTime) {
      return b.startTime - a.startTime;
    }
    return 0;
  });
};
