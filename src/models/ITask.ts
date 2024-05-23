export interface ITask {
  body: string;
  startTime: number | null;
  endTime: number | null;
  id: number;
  date: string;
}

export interface IPassedTask {
  date: string;
  tasks: ITask[];
}
