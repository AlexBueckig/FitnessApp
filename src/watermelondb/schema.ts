import { appSchema, tableSchema } from '@nozbe/watermelondb';

const schema = appSchema({
  version: 12,
  tables: [
    tableSchema({
      name: 'workouts',
      columns: [{ name: 'name', type: 'string' }, { name: 'active', type: 'boolean' }]
    }),
    tableSchema({
      name: 'days',
      columns: [
        { name: 'description', type: 'string' },
        { name: 'days', type: 'string' },
        { name: 'workout_id', type: 'string', isIndexed: true }
      ]
    }),
    tableSchema({
      name: 'sets',
      columns: [{ name: 'sets', type: 'number' }, { name: 'day_id', type: 'string', isIndexed: true }]
    }),
    tableSchema({
      name: 'exercises',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'muscles', type: 'string' }
      ]
    }),
    tableSchema({
      name: 'set_exercises',
      columns: [
        { name: 'set_id', type: 'string', isIndexed: true },
        { name: 'exercise_id', type: 'string', isIndexed: true }
      ]
    })
  ]
});

export default schema;
