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
  Certainly! Here's the information about parameterized queries added to your README.md:

### Parameterized Queries

You can use parameterized queries in React Query to fetch data based on specific parameters. For example, you can fetch posts for a particular user by passing the `userId` as a parameter to the query.

To use parameterized queries, follow these steps:

1. Create a custom query hook that accepts the parameter you want to use in the query, such as `userId`:

```jsx
const usePosts = (userId: number | undefined) => {
  const fetchPosts = () =>
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId,
        },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"], // Whenever userId is changed, React Query fetches posts for this user (dependency).
    queryFn: fetchPosts,
    staleTime: 10 * 60 * 60 * 1000, // 10 hours in seconds
  });
};
```

2. Use this custom query hook in your component, passing the `userId` as a parameter:

```jsx
const { data: posts, isLoading, error } = usePosts(userId);
// Pass the userId as a parameter
```

### Pagination Queries

1. Create a custom query hook that accepts a query object with page and pageSize parameters. This hook will fetch a subset of data based on the provided parameters.

```jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  const fetchPosts = () =>
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchPosts,
    staleTime: 10 * 60 * 60 * 1000, // 10 hours in seconds
    keepPreviousData: true, // Keep previous data for the current page for a seamless experience.
  });
};

export default usePosts;
```

2. Use the custom query hook in your component to fetch paginated data. You can control the page and pageSize to load the data you need.

```jsx
import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, error } = usePosts({ page, pageSize });

  if (isLoading) return <p>Loading........</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary my-3"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        className="btn btn-primary my-3 ms-1"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default PostList;
```

With this setup, you can fetch and display data in pages, allowing users to navigate through the dataset efficiently.

## Mutations

### Mutating Data

```ts
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
  const addTodo = useMutation<Todo, Error, Todo>({
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
```

### Handling mutation Errors

add this in above file

````ts
{addTodo.error && (
        <div className="alet alert-danger">{addTodo.error.message}</div>
      )}```
````

### Showing Mutations Progress

add this in above file

```ts
<button disabled={addTodo.isLoading} className="btn btn-primary">
  {addTodo.isLoading ? "Adding.." : "Add"}
</button>
```

### Global state Management

-Consolidating state logic with reducer
-Sharing data using React Context
-When to use React Context
-React Context vs Redux
-Managing application state using zustand

### Consolidating State Logic with a Reducer

**Reducer** - A function that allows us to centralize state updates in a component.

- create a reducer

```tsx
interface Action {
  type: "INCREMENT" | "RESET";
}

const counterReducer = (state: number, action: Action): number => {
  if (action.type === "INCREMENT") return state + 1;
  if (action.type === "RESET") return 0;
  return state;
};

export default counterReducer;
```

- use this reducer

```tsx
import { useReducer } from "react";
import counterReducer from "./reducers/counterReducer";

const Counter = () => {
  const [value, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      Counter ({value})
      <button
        onClick={() =>
          dispatch({
            type: "INCREMENT",
          })
        }
        className="btn btn-primary mx-1"
      >
        Increment
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "RESET",
          })
        }
        className="btn btn-primary mx-1"
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
```

### Creating Complex Actions

-creating a task reducer

```tsx
interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD";
  task: Task;
}

interface DeleteTask {
  type: "DELETE";
  id: number;
}

type TaskAction = AddTask | DeleteTask;

const taskReducer = (tasks: Task[], action: TaskAction) => {
  switch (action.type) {
    case "ADD":
      return [...tasks, action.task];
    case "DELETE":
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
};

export default taskReducer;
```

-use taskreducer

```tsx
import { useReducer } from "react";
import taskReducer from "./reducers/taskReducer";

const TaskList = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <>
      <button
        onClick={() =>
          dispatch({
            type: "ADD",
            task: {
              id: Date.now(),
              title: "Task " + Date.now(),
            },
          })
        }
        className="btn btn-primary my-3"
      >
        Add Task
      </button>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="flex-grow-1">{task.title}</span>
            <button
              className="btn btn-outline-danger"
              onClick={() =>
                dispatch({
                  type: "DELETE",
                  id: task.id,
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
```

## Sharing State using React Context

**Sharing state** - Lift the state up to the closest parent and pass it down as props to child components.

- create context

```tsx
import { Task, TaskAction } from "../reducers/taskReducer";
import React from "react";

interface TasksContextType {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

const TasksContext = React.createContext<TasksContextType>(
  {} as TasksContextType
);

export default TasksContext;
```

- add this to the main componet where state is present and want to share as in form or Provider

```tsx
const App = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <>
      <TasksContext.Provider value={{ tasks, dispatch }}>
        <TaskList />
      </TasksContext.Provider>
    </>
  );
};

export default App;
```

-- use the context in any component under App component

```tsx
import { useContext } from "react";
import TasksContext from "./context/task-context";

const { dispatch, tasks } = useContext(TasksContext);
```

### Creating a Custom Provider

- create a custom auth provider

```tsx
import React, { useReducer } from "react";
import loginReducer from "./reducers/loginReducer";
import AuthContext from "./context/auth-context";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(loginReducer, "");

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
```

-- Use this in app component

```tsx
<AuthProvider>
  <LoginStatus />
</AuthProvider>
```

### Creating a Hook to Access Context

- create a new custom hook to access

```tsx
import React from "react";
import { AuthAction } from "../reducers/loginReducer";

interface AuthContextType {
  user: string;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
```

- use this in any component

```tsx
const { user, dispatch } = useAuth();
```

**Splitting Contexts for Efficiency**

React Context => A context should only hold values that are closely related and tend to change together.

**Minimizing Renders**

Split up a context into smaller and focused ones, each having a single responsibility.

**When to Use Context**

1. Server state ==> React Query
2. Client state ==> Local state + React Context (useState(), useReducer())

**React Context Usage Scenarios:**

1. **Server State (React Query):**

   - **Use Case:** Manage and cache server data efficiently.
   - **Implementation:** Combine React Query for server-state with React Context for seamless global state sharing.

2. **Client State (Local State or `useReducer()`):**

   - **Use Case:** Handle local component state.
   - **Implementation:** For smaller-scale state, use local state or `useReducer()` within the component; Context is unnecessary for isolated state.

3. **Combining Server and Client State:**

   - **Use Case:** Access both server-state and local client-state.
   - **Implementation:** Use React Query for server state, and React Context for global client state.

4. **Avoiding Prop Drilling:**

   - **Use Case:** Eliminate passing props through multiple layers.
   - **Implementation:** Employ React Context for a centralized state store, reducing prop drilling complexity.

5. **Dynamic Theming or Styling:**

   - **Use Case:** Support dynamic theming or styling changes.
   - **Implementation:** Store styling info in React Context for components to adjust appearance dynamically.

6. **Optimizing Performance (Medium-sized Apps):**
   - **Use Case:** Minimize overhead in medium-sized apps.
   - **Implementation:** Use React Context for lightweight state management, suitable for smaller to medium-sized applications.

### React Context vs Redux

#### **React Context:**

- **Pros:**
  - Lightweight and simple.
  - Ideal for smaller to medium-sized apps.
  - Avoids prop drilling with centralized state.
  - Seamless integration with React Hooks.

#### **Redux:**

- **Pros:**
  - Predictable state management.
  - Middleware support for advanced features.
  - Suitable for large applications with complex state.
  - Robust ecosystem and powerful DevTools.

#### **Choosing Between Them:**

- **Consider:**
  - Application size and complexity.
  - Need for advanced features and middleware.
  - Team preferences and collaboration.

## Managing Application State with Zustand

1. Install - `npm install zustand`

- create a store

```tsx
import { create } from "zustand";

interface CounterStore {
  counter: number;
  increment: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  reset: () => set(() => ({ counter: 0 })),
}));

export default useCounterStore;
```

- use this in any component

```tsx
import useCounterStore from "./store";

const Counter = () => {
  const { counter, increment, reset } = useCounterStore();
  return (
    <div>
      Counter ({counter})
      <button onClick={() => increment()} className="btn btn-primary mx-1">
        Increment
      </button>
      <button onClick={() => reset()} className="btn btn-primary mx-1">
        Reset
      </button>
    </div>
  );
};

export default Counter;
```
