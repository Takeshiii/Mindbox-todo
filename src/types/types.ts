import { ChangeEvent } from "react";

export interface TodoCard {
  name: string;
  status: boolean;
  id: string;
}

export interface TodoList {
  todos: TodoCard[];
}

export interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
  onClick: () => void;
}
