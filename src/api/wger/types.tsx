interface IPostParams {
  id?: number;
  creation_date?: Date;
  comment?: string;
}

interface IScheduleOptions {
  id?: number;
  name: string;
  start_date?: Date;
  is_active?: boolean;
  is_loop?: boolean;
}

interface IDayOptions {
  id?: number;
  description: string;
  // TODO: Training Object
  training: Array<{}>;
}

interface ISetOptions {
  id?: number;
  order?: number;
  sets?: number;
  // TODO: Exercise Day Object
  exerciseday: Array<{}>;
}

interface ISettingOptions {
  id?: number;
  reps: number;
  weight?: number;
  order?: number;
  comment?: string;
  // TODO: Set Object
  set: Array<{}>;
}

interface IWorkoutlogOptions {
  id?: number;
  reps: number;
  weight: number;
  date: Date;
  // TODO: Exercise Object
  exercise: Array<{}>;
}
