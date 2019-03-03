import { appSchema, tableSchema } from '@nozbe/watermelondb';

const schema = appSchema({
  version: 5,
  tables: [
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
