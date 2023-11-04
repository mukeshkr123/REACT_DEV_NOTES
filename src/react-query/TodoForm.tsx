import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

// Define the shape of a Todo object
interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoForm = () => {
  // Access the QueryClient and Mutation function
  const queryClient = useQueryClient();
  const addTodo = useMutation({
    // Define the mutation function
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.data),
    // Define the action to be taken after a successful mutation
    onSuccess: (savedTodo, newTodo) => {
      console.log(savedTodo);

      // Invalidate the cache - approach 1
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      // Update the data in the cache - approach 2
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
    },
  });

  // Create a ref for the input field
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      className="row mb-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current && ref.current.value) {
          // Trigger the mutation with new Todo data
          addTodo.mutate({
            id: 0,
            title: ref.current?.value,
            completed: true,
            userId: 1,
          });
        }
      }}
    >
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;
