import { appSchema, tableSchema } from '@nozbe/watermelondb';

const schema = appSchema({
  version: 9,
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
      name: 'exercises',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'muscles', type: 'string' }
      ]
    })
  ]
});

export default schema;
