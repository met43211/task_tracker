import { ITask } from "../../models/ITask";

export const changeOrder = (
  currentTasks: ITask[],
  currentTask: ITask,
  overTask: ITask
) => {
  const current = currentTask;
  const over = overTask;
  const currentIndex = currentTasks.findIndex((task) => task.id === current.id);
  const overIndex = currentTasks.findIndex((task) => task.id === over.id);
  if (currentIndex !== -1 && overIndex !== -1) {
    const updatedCurrentTasks = [...currentTasks];
    [updatedCurrentTasks[currentIndex], updatedCurrentTasks[overIndex]] = [
      updatedCurrentTasks[overIndex],
      updatedCurrentTasks[currentIndex],
    ];
    return updatedCurrentTasks;
  }
};
