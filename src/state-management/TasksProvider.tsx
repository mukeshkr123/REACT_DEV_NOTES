import React, { useReducer } from "react";
import taskReducer from "./reducers/taskReducer";
import TasksContext from "./context/task-context";

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
