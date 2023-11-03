import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  const fetcTodos = () =>
    axios
      .get<Todo>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const { data: todos, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetcTodos,
  });

  if (error) return null;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
