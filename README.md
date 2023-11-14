# Getting Started with React JS

# Table of Contents

1. [Setting up the Development Environment](#setting-up-the-development-environment)

2. [Building Components](#building-components)

   1. [Creating a React Component](#creating-a-react-component)
   2. [Rendering Lists](#rendering-lists)
   3. [Conditional Rendering](#conditional-rendering)
   4. [Handling Events](#handling-events)
   5. [Managing State](#managing-state)
   6. [Passing Data via Props](#passing-data-via-props)
   7. [Passing Functions via Props](#passing-functions-via-props)
   8. [State vs Props](#state-vs-props)
   9. [Passing children](#passing-children)

3. [Styling React Components](#styling-react-components)

   1. [Vanilla CSS](#vanilla-css)
   2. [CSS Modules](#css-modules)
   3. [CSS-in-JS](#css-in-js)
   4. [Separation of Concerns](#separation-of-concerns)
   5. [Inline Styles](#inline-styles)
   6. [Additional Resources](#additional-resources)

4. [Building Forms in React](#building-forms-in-react)

   1. [Handling Form Submission](#handling-form-submission)
   2. [Accessing Input Fields](#accessing-input-fields)
      1. [Using `ref` Hook](#using-ref-hook)
      2. [Using `useState` Hook](#using-usestate-hook)
   3. [Managing State with React Hook Form](#managing-state-with-react-hook-form)
   4. [Applying Validations](#applying-validations)
   5. [Schema-Based Validation with Zod](#schema-based-validation-with-zod)
   6. [Disabling Submit Button](#disabling-submit-button)

5. [Connecting to the Backend with React](#connecting-to-the-backend-with-react)

   1. [useEffect Hook](#useeffect-hook)
   2. [Sending HTTP Requests](#sending-http-requests)
   3. [Cancelling a Fetch Request](#cancelling-a-fetch-request)
   4. [Showing a Loading Indicator](#showing-a-loading-indicator)
   5. [Extracting a Reusable API Client](#extracting-a-reusable-api-client)
   6. [Extracting the User Service](#extracting-the-user-service)
   7. [Creating a Generic HTTP Service](#creating-a-generic-http-service)
   8. [Creating a Custom Data Fetching Hook](#creating-a-custom-data-fetching-hook)

## Setting up the Development Environment

To start a React project, you can use either `create-vite` or `create-react-app`. Run the following command to set up your project:

- Using `create-vite`:

```bash
npx create-vite my-react-app
```

- Using `create-react-app`:

```bash
npx create-react-app my-react-app
```

Replace `my-react-app` with your desired project name.

## Building Components

### Creating a React Component

You can create a functional component like this:

**Message.tsx**

```jsx
import React from "react";

function Message() {
  const name = "Mukesh";
  return <div>{name}</div>;
}

export default Message;
```

Consider adding an import statement for React at the top of your component file.

**Fragments** - You can use fragments to wrap multiple elements without adding extra nodes to the DOM.

```jsx
<>{/* Your content here */}</>
```

### Rendering Lists

When rendering lists, use the `key` attribute to uniquely identify and optimize the rendering of elements.

**List.js**

```jsx
import React from "react";

interface ListItem {
  name: string;
}

function List() {
  const items: ListItem[] = [
    { name: "New York" },
    { name: "Mexico" },
    { name: "Delhi" },
    { name: "Patna" },
    { name: "Mumbai" },
  ];

  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
```

### Conditional Rendering

You can conditionally render content based on a condition.

**List.js**

```jsx
import React from "react";

interface ListItem {
  name: string;
}

function List() {
  const items: ListItem[] = [
    { name: "New York" },
    { name: "Mexico" },
    { name: "Delhi" },
    { name: "Patna" },
    { name: "Mumbai" },
  ];

  return (
    <>
      <h1>List</h1>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul className="list-group">
          {items.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default List;
```

### Handling Events

You can handle events in React by using event handlers.

```jsx
<li
  key={index}
  className="list-group-item"
  onClick={() => console.log(item.name)}
>
  {item.name}
</li>
```

### Managing State

Managing state in React involves using the `useState` hook. Declare a state variable and use it to update the component's state.

**List.js**

```jsx
import React, { useState } from "react";

interface ListItem {
  name: string;
}

function List() {
  const [selectedIndex, setSelectedIndex] = useState < number > -1;

  // Rest of the component code
}
```

### Passing Data via Props

Props allow you to pass data from a parent component to a child component.

**App.js**

```jsx
import React from "react";
import List from "./List";

function App() {
  const items: ListItem[] = [
    { name: "New York" },
    { name: "Mexico" },
    { name: "Delhi" },
    { name: "Patna" },
    { name: "Mumbai" },
  ];

  return (
    <>
      <List items={items} heading="Cities" />
    </>
  );
}

export default App;
```

**List.js**

```jsx
import React, { useState } from "react";

interface ListProps {
  items: ListItem[];
  heading: string;
}

function List({ items, heading }: ListProps) {
  // Rest of the component code
}
```

### Passing Functions via Props

You can also pass functions as props to child components.

**App.js**

```jsx
import React from 'react';
import List from './List';

function App() {
  const items: ListItem[] = [
    { name: "New York" },
    { name: "Mexico" },
    { name: "Delhi" },
    { name: "Patna" },
    { name: "Mumbai" }
  };

  const handleSelectItem = (item: string) => {
    console.log(item);
  }

  return (
    <>
      <List items={items} heading="Cities" onSelectItem={handleSelectItem} />
    </>
  );
}

export default App;
```

**List.js**

```jsx
import React, { useState } from "react";

interface ListProps {
  items: ListItem[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function List({ items, heading, onSelectItem }: ListProps) {
  // Rest of the component code
}
```

### State vs Props

**Props:**

- Props are inputs passed to a component.
- They are similar to function arguments.
- Props are immutable and cannot be changed within a component.

**State:**

- State represents data managed by a component.
- It is similar to local variables.
- State is mutable, and you can update it using hooks like `useState`.

### Passing children

-Parent componet `app.tsx` passing children

```ts
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <Alert>
        This is my alert <span>Hello mukesh</span>
      </Alert>
    </>
  );
}

export default App;
```

- Comonent getting children as props in `Alert.tsx`

```ts
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Alert = ({ children }: Props) => {
  return <div className="alert alert-primary">{children}</div>;
};

export default Alert;
```

## Styling React Components

Styling React components is an essential part of creating visually appealing and user-friendly web applications. There are several methods and tools available to style React components, each with its own advantages and use cases. Here, we'll explore some common approaches and terms related to styling React components.

### 1. Vanilla CSS

Vanilla CSS is the traditional way of styling web applications. In this approach, you write your component styles in a separate CSS file and import it into the component file. For example:

```jsx
// ListGroup.js
import "./ListGroup.css";

function ListGroup() {
  return <ul className="list-group"> </ul>;
}
```

However, using vanilla CSS may lead to conflicts if the same CSS classes are defined in multiple files, potentially causing styling issues.

### 2. CSS Modules

CSS Modules address the conflicts issue in vanilla CSS by generating unique class names during the build process. This ensures that styles are scoped to the specific component. To use CSS Modules, you create a separate CSS file with a naming convention, like `.module.css`, and import it in your component file:

```jsx
// ListGroup.module.css
import styles from "./ListGroup.module.css";

function ListGroup() {
  return <ul className={styles.listGroup}> </ul>;
}
```

This approach provides better encapsulation and avoids naming conflicts.

### 3. CSS-in-JS

CSS-in-JS is an alternative approach where you define all the styles for a component alongside its code. One popular library for CSS-in-JS is styled-components. With CSS-in-JS, you can create styled components using template literals, and it provides scoping for CSS classes and eliminates conflicts. It also makes it easier to change or delete a component without affecting other components:

```jsx
import styled from "styled-components";

const List = styled.div`
  list-style: none;
  background: ${(props) => (props.active ? "active" : "blue")};
`;

function ListGroup() {
  return <List> </List>;
}
```

CSS-in-JS allows you to write component-specific styles, making it easy to manage and maintain your styles.

### 4. Separation of Concerns

The Separation of Concerns (SoC) principle is crucial when developing applications. It suggests dividing a program into distinct sections or modules, where each section handles a specific functionality. This helps build modular and maintainable applications. SoC is not just about organizing code into files but also about dividing areas of functionality. In the context of CSS-in-JS, it does not violate the SoC principle because all the complexity for a component remains hidden behind its interface.

### 5. Inline Styles

Inline styles allow you to define styles directly within your React components. While they are easy to apply, they can make your code difficult to maintain over time and should only be used as a last resort.

### Additional Resources

- You can add icons to your applications using the `react-icons` library.
- Various UI libraries are available to assist in building beautiful and modern applications. Some popular options include Bootstrap, Material UI, TailwindCSS, DaisyUI, ChakraUI, and more.

# Building Forms in React

This guide will help you understand how to create forms in React using different techniques and libraries, such as React Hook Form and Zod for schema-based validation.

## Handling Form Submission

To handle form submissions, set the `onSubmit` attribute of the form element.

```tsx
const ExpenseForm = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="btn mt-3 btn-primary">
        Submit
      </button>
    </form>
  );
};
```

## Accessing Input Fields

You can access input field values using the `ref` hook or manage form state using the `useState` hook.

### Using `ref` Hook

```tsx
const nameRef = useRef<HTMLInputElement>(null);
const amountRef = useRef<HTMLInputElement>(null);
// ...
<input ref={nameRef} type="text" id="name" className="form-control" />
<input ref={amountRef} type="text" id="amount" className="form-control" />
```

### Using `useState` Hook

```tsx
const [person, setPerson] = useState({
  name: "",
  amount: 0,
});
// ...
<input
  type="text"
  onChange={(e) => setPerson({ ...person, name: e.target.value })}
  value={person.name}
  className="form-control"
/>
<input
  type="text"
  onChange={(e) => setPerson({ ...person, amount: parseInt(e.target.value) })}
  value={person.amount}
  id="amount"
  className="form-control"
/>
```

## Managing State with React Hook Form

Use the React Hook Form library to simplify form state management.

```tsx
import { FieldValues, useForm } from "react-hook-form";

const ExpenseForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name")}
        type="text"
        id="name"
        className="form-control"
      />
      <input
        {...register("amount")}
        type="text"
        id="amount"
        className="form-control"
      />
      <button type="submit" className="btn mt-3 btn-primary">
        Submit
      </button>
    </form>
  );
};
```

## Applying Validations

You can apply validations to form fields, such as "required" and "minLength," using React Hook Form.

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>();

<input
  {...register("name", { required: true, minLength: 3 })}
  type="text"
  id="name"
  className="form-control"
/>;
{
  errors.name?.type === "required" && <p>The name field is required</p>;
}
{
  errors.name?.type === "minLength" && (
    <p>The name must be at least 3 characters</p>
  );
}
```

## Schema-Based Validation with Zod

You can use the Zod library for schema-based validation.

```tsx
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, "Minimum 3 characters required"),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(18, "Minimum 18 characters required"),
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({ resolver: zodResolver(schema) });

<input {...register("name")} type="text" id="name" className="form-control" />;
{
  errors.name && <p>{errors.name.message}</p>;
}

<input
  {...register("amount", { valueAsNumber: true })}
  type="text"
  id="amount"
  className="form-control"
/>;
{
  errors.amount && <p>{errors.amount.message}</p>;
}
```

## Disabling Submit Button

You can disable the submit button based on form validity.

```tsx
const {
  register,
  handleSubmit,
  formState: { errors, isValid },
} = useForm<FormData>({ resolver: zodResolver(schema) });

<button type="submit" disabled={!isValid} className="btn mt-3 btn-primary">
  Submit
</button>;
```

## Connecting to the Backend with React

This project demonstrates how to connect a React front-end application to a backend server using Axios for HTTP requests. It includes examples of using the useEffect hook for executing code after component rendering, fetching data from the backend, canceling a fetch request, showing a loading indicator, and extracting reusable components and services.

### useEffect Hook

The `useEffect` hook is used to execute a piece of code after the component is rendered. In the example below, it is used to focus on an input element:

```tsx
function App() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  return (
    <>
      <input ref={ref} type="text" className="form-control" />
    </>
  );
}
```

**Fetching Data**-

### Sending HTTP Requests

HTTP requests are made using Axios in the following example:

```tsx
import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```

### Cancelling a Fetch Request

To cancel a fetch request, an `AbortController` is used as follows:

```tsx
import axios, { CanceledError } from "axios";

useEffect(() => {
  const controller = new AbortController();
  axios
    .get<User[]>("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
    });

  return () => controller.abort();
}, []);
```

### Showing a Loading Indicator

A loading indicator is shown while fetching data:

```tsx
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      setLoading(false);
      setUsers(res.data);
    })
    .catch((err) => {
      setLoading(false);
      setError(err.message);
    });
}, []);

if (loading) return <p>Loading..... </p>;
```

### Extracting a Reusable API Client

An API client is extracted into a separate file `/services/api-client.ts`:

```tsx
// /services/api-client.ts
import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export { CanceledError };
```

This client is then used in any component:

```tsx
// Any component
import apiClient, { CanceledError } from "./services/api-client";

useEffect(() => {
  apiClient
    .get("/users", {
      signal: controller.signal,
    })
    .then((res) => {
      setUsers(res.data);
    });
}, []);
```

### Extracting the User Service

A separate `user-service` is created to handle user-related API calls:

```tsx
// /services/user-service.ts
import apiClient from "./api-client";

export interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  deleteUser(id: number) {
    return apiClient.delete("/users" + id);
  }

  addUser(user: User) {
    return apiClient.post("/users", user);
  }
}

export default new UserService();
```

This service is then used in any component:

```tsx
// Any component
const [users, setUsers] = useState<User[]>([]);
const [error, setError] = useState(" ");

useEffect(() => {
  const { request, cancel } = userService.getAllUsers();

  request
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
    });

  return () => cancel();
}, []);

const deleteUser = (user: User) => {
  const originalUsers = [...users];
  setUsers(users.filter((u) => u.id !== user.id));
  userService.deleteUser(user.id).catch((err) => {
    setError(err.message);
    setUsers(originalUsers);
  });
};
```

### Creating a Generic HTTP Service

A generic HTTP service is created to handle common HTTP operations:

```tsx
// /services/http-service.ts
import apiClient from "./api-client";

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
```

This service is then used in any service:

```tsx
// Any service
import create from "./http-service";

export interface User {
  id: number;
  name: string;
  email: string;
}
export default create("/users");
```

### Creating a Custom Data Fetching Hook

A custom data fetching hook `useUsers.ts` is created to encapsulate user-related logic:

```tsx
// /hooks/useUsers.ts
import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import userService, { User } from "../services/user-service";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(" ");
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    setisloading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setisloading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setisloading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, isloading, setError, set

Users };
};

export default useUsers;
```

This hook can then be used in any component:

```tsx
// Any component
import useUsers from "./hooks/useUsers";

const { error, isloading, users, setError, setUsers } = useUsers();
```
