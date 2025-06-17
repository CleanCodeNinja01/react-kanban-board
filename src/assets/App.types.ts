export type Card = {
    id: string;
    content: string;
  };
  
export type Column = {
    name: string;
    items: Card[];
  };
  
export type Columns = {
    [key: string]: Column;
  };