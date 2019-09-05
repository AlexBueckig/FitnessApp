import DatabaseProviderComponent from '@nozbe/watermelondb/DatabaseProvider';
import React, { FC } from 'react';
import database from './';

const DBWrapper = (Screen: any) => {
  const EnhancedComponent: FC<any> = props => (
    <DatabaseProviderComponent database={database}>
      <Screen {...props} />
    </DatabaseProviderComponent>
  );

  return EnhancedComponent;
};

export default DBWrapper;
