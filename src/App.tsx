import { useReducer } from "react";
import AuthProvider from "./state-management/AuthProvider";
import LoginStatus from "./state-management/LoginStatus";
import TaskList from "./state-management/TaskList";
import TasksContext from "./state-management/context/task-context";
import taskReducer from "./state-management/reducers/taskReducer";

const App = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <>
      <AuthProvider>
        <TasksContext.Provider value={{ tasks, dispatch }}>
          <LoginStatus />
          <TaskList />
        </TasksContext.Provider>
      </AuthProvider>
    </>
  );
};

export default App;
