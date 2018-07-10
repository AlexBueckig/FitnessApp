const ExerciseSchema = {
  name: 'Exercise',
  primaryKey: 'id',
  properties: {
    id: 'int',
    exerciseId: 'int'
  }
};

const WorkoutSchema = {
  name: 'Workout',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    exercises: 'Exercise[]'
  }
};

export { WorkoutSchema, ExerciseSchema };
