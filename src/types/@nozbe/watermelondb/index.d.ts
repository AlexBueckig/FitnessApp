type ColumnType = 'string' | 'boolean' | 'number';

declare module '@nozbe/watermelondb' {
  import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
  import { Observable } from 'rxjs';

  class Database {
    constructor(params: { adapter: SQLiteAdapter; modelClasses: Function[], actionsEnabled?: boolean });
    readonly collections: CollectionMap;
    readonly adapter: SQLiteAdapter;
    readonly schema: AppSchema;
    action<T extends Model>(work: (action: ActionInterface) => Promise<T>, description?: string): Promise<T>;
  }

  interface ActionInterface {
    subAction<T>(action: () => Promise<T>): Promise<T>;
  }

  interface CollectionMap {
    get<T extends Model>(tableName: string): Collection<T>;
  }

  interface Collection<T extends Model> {
    database: Database;
    table: string;
    schema: TableSchema;

    find(id: string): Promise<T>;
    findAndObserve(id: string): Observable<T>;
    query(...conditions: Condition[]): Query<T>;
    create(recordBuilder: (record: T) => void): Promise<T>;
  }

  // ------ QueryDescription ------
  type NonNullValue = number | string | boolean;
  type NonNullValues = number[] | string[] | boolean[];
  type Value = NonNullValue | null;
  type Operator = 'eq' | 'notEq' | 'gt' | 'gte' | 'weakGt' | 'lt' | 'lte' | 'oneOf' | 'notIn' | 'between';
  type ComparisonRight = { value: Value } | { values: NonNullValues } | ColumnDescription;
  interface Comparison {
    operator: Operator;
    right: ComparisonRight;
  }
  interface ColumnDescription {
    column: string;
  }
  interface WhereDescription {
    type: 'where';
    left: string;
    comparison: Comparison;
  }

  type Where = WhereDescription | And | Or;
  type And = { type: 'and'; conditions: Where[] };
  type Or = { type: 'or'; conditions: Where[] };
  type On = {
    type: 'on';
    table: string;
    left: string;
    comparison: Comparison;
  };
  type Condition = Where | On;
  type QueryDescription = { where: Where[]; join: On[] };

  class Q {
    static eq(valueOrColumn: Value | ColumnDescription): Comparison;
    static notEq(valueOrColumn: Value | ColumnDescription): Comparison;
    static gt(valueOrColumn: NonNullValue | ColumnDescription): Comparison;
    static gte(valueOrColumn: NonNullValue | ColumnDescription): Comparison;
    static weakGt(valueOrColumn: NonNullValue | ColumnDescription): Comparison;
    static lt(valueOrColumn: NonNullValue | ColumnDescription): Comparison;
    static lte(valueOrColumn: NonNullValue | ColumnDescription): Comparison;
    static oneOf(values: NonNullValues): Comparison;
    static notIn(values: NonNullValues): Comparison;
    static between(left: number, right: number): Comparison;
    static where(left: string, valueOrComparison: Value | Comparison): WhereDescription;
    static and(...conditions: Where[]): And;
    static or(...conditions: Where[]): Or;
    static on(table: string, column: string, value: Value): On;
    static on(table: string, column: string, comparison: Comparison): On;
    static on(table: string, where: WhereDescription): On;
  }
  // ------ end QueryDescription ------

  interface Query<T extends Model> {
    collection: Collection<T>;
    description: QueryDescription;

    extend(...conditions: Condition[]): Query<T>;
    fetch(): Promise<T[]>;
    fetchCount(): Promise<number>;
    observe(): Observable<T[]>;
    observeWithColumns(rawFields: string[]): Observable<T[]>;
    observeCount(isThrottled: boolean): Observable<number>;
    markAllAsDeleted(): Promise<void>;
    destroyAllPermanently(): Promise<void>;
  }

  type BelongsToAssociation = { type: string; key: string };
  type HasManyAssociation = { type: string; foreignKey: string };
  type AssociationInfo = BelongsToAssociation | HasManyAssociation;
  type SyncStatus = 'synced' | 'created' | 'updated' | 'deleted';

  abstract class Model {
    static table: string;
    static associations: Record<string, AssociationInfo>;

    readonly id: string;
    readonly syncStatus: SyncStatus;
    readonly collection: Collection<this>;
    readonly collections: CollectionMap;

    update(recordUpdater: (object: this) => void): Promise<void>;
    prepareUpdate(recordUpdater: (object: this) => void): this;
    markAsDeleted(): Promise<void>;
    destroyPermanently(): Promise<void>;
    observe(): Observable<this>;
  }

  interface Relation<T extends Model> {
    id: string;

    fetch(): Promise<T>;
    set(record: T): void;
    observe(): Observable<T>;
  }

  // ---------- Schema -----------
  interface AppSchema {
    version: number;
    tables: Record<string, TableSchema>[];
  }

  interface TableSchema {}

  interface ColumnSchema {
    name: string;
    type: ColumnType;
    isOptional?: boolean;
    isIndexed?: boolean;
  }

  interface SchemaMigrations {}

  export function appSchema(schema: { version: number; tables: TableSchema[] }): AppSchema;

  export function tableSchema(schema: { name: string; columns: ColumnSchema[] }): TableSchema;
  // ---------- end Schema -----------
}

declare module '@nozbe/watermelondb/adapters/sqlite' {
  import { AppSchema, SchemaMigrations } from '@nozbe/watermelondb';

  export default class SQLiteAdapter {
    constructor(params: { dbName?: string; schema: AppSchema; migrationsExperimental?: SchemaMigrations });
  }
}

declare module '@nozbe/watermelondb/decorators' {
  export function field(columnName: string): any;
  export function date(columnName: string): any;
  export function relation(columnName: string, foreignKey: string): any;
  export function children(columnName: string): any;
  export function text(columnName: string): any;
  export function json(columnName: string, sanitizer: (json: any) => any): any;
  export function action (...args: any[]): any;
}

declare module '@nozbe/watermelondb/DatabaseProvider' {
  import { Database } from '@nozbe/watermelondb';
  import { Component } from 'react';

  export interface DatabaseProviderProps {
    database: Database;
  }

  export function withDatabase(component: Component): Component;

  export default function DatabaseProvider(props: any): any;
}