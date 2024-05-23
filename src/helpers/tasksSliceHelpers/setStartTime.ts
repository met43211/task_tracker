import { ITask } from "../../models/ITask";

export const setStartTime = (tasks: ITask[], id: number) => {
  return tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        startTime: new Date().getTime(),
      };
    }
    return task;
  });
};
