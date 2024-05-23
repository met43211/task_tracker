import { ITask } from "../../models/ITask";

export const editCurrentOrTodayTask = (tasks: ITask[], propsTask: ITask) => {
  return tasks.map((task) => {
    if (task.id === propsTask.id) {
      return propsTask;
    }
    return task;
  });
};
