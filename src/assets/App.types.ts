export type Card = {
  id: string;
  content: string;
};

export type ColumnType = {
  name: string;
  items: Card[];
};

export type Columns = {
  [key: string]: ColumnType;
};
