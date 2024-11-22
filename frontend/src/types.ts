export type Todo = {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
};

export type TodoItemProps = {
  todo: Todo;
};

export interface TodoFormProps {
  existingTodo?: Todo;
  onSave: (todo: Todo) => void;
}

export type NewTodo = Omit<Todo, "id" | "is_completed">;
