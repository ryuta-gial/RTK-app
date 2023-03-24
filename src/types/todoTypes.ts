export const initialState: initialStateType = {
  todo: null,
  todoList: [],
};

export type initialStateType = {
  todo: toDoType | null;
  todoList: toDoType[];
};

export type toDoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
