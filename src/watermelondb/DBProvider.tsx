import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import React, { FC } from 'react';
import database from './';

const DBProvider: FC = props => <DatabaseProvider database={database}>{props.children}</DatabaseProvider>;

export default DBProvider;
