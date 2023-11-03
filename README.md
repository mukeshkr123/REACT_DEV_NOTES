# React Intermediate

## React Query

-A powerful library for managing data fetching and cachcing in React Applications.

### Setting Up React Query

**To install React Query** - `npm i @tanstack/react-query`

--Adding to main.tsx or index.tsx--

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### Fetching Data and Error handling

```jsx
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const fetcTodos = () => axios.get;
  "https://jsonplaceholder.typicode.com/todos".then((res) => res.data);

  const { data: todos, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetcTodos,
  });

  //error
  if(error) return <p>{error}<p/>

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
```
