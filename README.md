Sure, here's the content you provided formatted into a README file:

# React Intermediate

## React Query

React Query is a powerful library for managing data fetching and caching in React applications.

### Setting Up React Query

To install React Query, run the following command:

```shell
npm i @tanstack/react-query
```

Next, add the following code to your main.tsx or index.tsx file:

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

### Fetching Data and Error Handling

```jsx
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const fetchTodos = () => axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => res.data);

  const { data: todos, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (error) return <p>{error}<p/>

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

### Showing Loading Indicator

```jsx
const fetchTodos = () =>
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.data);

const {
  data: todos,
  error,
  isLoading,
} = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});

if (isLoading) return <p>Loading.......</p>;
```

### Creating a Custom Query Hook

1. Create a custom query hook `useTodos.ts`:

```jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTodos = () => {
  const fetchTodos = () =>
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};

export default useTodos;
```

2. Use this custom hook in any component:

```jsx
import useTodos from "./hooks/useTodos";

const { data: todos, error, isLoading } = useTodos();
```

### Using React Query DevTools

To install React Query DevTools, run the following command:

```shell
npm install react-query-devtools
```

Add the following code in your main JS file:

```jsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Customizing Query Settings

You can customize query settings in the QueryClient. For example, to configure auto-refresh options, you can do the following:

```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 300_000, // 5 minutes
      staleTime: 10 * 1000, // 10 seconds
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnReconnect: false, // Disable refetch on network reconnect
      refetchOnMount: false, // Disable refetch when a component is mounted
    },
  },
});
```

You can also override these options in a custom query hook:

```jsx
const useTodos = () => {
  const fetchTodos = () =>
    axios.get <
    Todo >
    "https://jsonplaceholder.typicode.com/todos".then((res) => res.data);

  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 10 * 1000, // 10 seconds
  });
};
```

Customize the options according to your application's requirements:

- `retry`: Number of retries on failure.
- `cacheTime`: Time to keep data in cache.
- `staleTime`: Time until the data is considered stale.
- `refetchOnWindowFocus`: Whether to refetch data when the window is refocused.
- `refetchOnReconnect`: Whether to refetch data when the network is reconnected.
- `refetchOnMount`: Whether to refetch data when a component is mounted.
