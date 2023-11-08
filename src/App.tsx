import { useReducer } from "react";
import LoginStatus from "./state-management/LoginStatus";
import taskReducer from "./state-management/reducers/taskReducer";
import TasksContext from "./state-management/context/task-context";
import TaskList from "./state-management/TaskList";

const App = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <>
      <TasksContext.Provider value={{ tasks, dispatch }}>
        <LoginStatus />
        <TaskList />
      </TasksContext.Provider>
    </>
  );
};

export default App;
