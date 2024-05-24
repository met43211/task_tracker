import { IPassedTask, ITask } from "../../models/ITask";

export const filterPssedTasks = (
  passedTasks: IPassedTask[],
  passedTask: ITask
) => {
  passedTasks = passedTasks.map((date) => {
    if (date.date === passedTask.date) {
      return {
        ...date,
        tasks: date.tasks.filter((task) => task.id !== passedTask.id),
      };
    }
    return date;
  });
  passedTasks = passedTasks.filter((date) => date.tasks.length > 0);
  return passedTasks;
};
