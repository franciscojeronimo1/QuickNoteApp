export enum Category {
  Work = 'Work',
  Personal = 'Personal',
  School = 'School',
}

export interface Note {
  _id: number;
  text: string;
  category: Category;
}
