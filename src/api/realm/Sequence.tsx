import Realm from 'realm';

interface ICard {
  key: string;
  text: string;
  id: number;
}

interface IWorkout {
  key: string;
  value: string;
  id: number;
}

interface ISequenceProps {
  name: string;
  value: number;
}

type Props = ICard | IWorkout;

class Sequence {
  public static save(realm: Realm, schema: string, props: Props) {
    let saved = {};

    realm.write(() => {
      const obj = { ...props };

      if (obj.id === undefined) {
        let seq = realm.objects<ISequenceProps>('Sequence').filtered(`name = "${schema}"`)[0];
        if (seq === undefined) {
          seq = realm.create('Sequence', { name: schema, value: 0 });
        }
        seq.value = seq.value + 1;
        obj.id = seq.value;
      }
      saved = realm.create(schema, obj, true);
    });

    return { ...saved };
  }

  public schema = {
    name: 'Sequence',
    primaryKey: 'name',
    properties: {
      name: 'string',
      value: 'int'
    }
  };
}

export default Sequence;
