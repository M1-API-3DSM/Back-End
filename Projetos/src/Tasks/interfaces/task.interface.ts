export type Task = {
  name: string;
  description: string;
  value: number;
  stage: 'waiting' | 'ready' | 'in progress' | 'qa' | 'done';
  deadline: Date;
};
