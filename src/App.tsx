import { useReducer } from "react";
import LoginStatus from "./state-management/LoginStatus";
import taskReducer from "./state-management/reducers/taskReducer";
import TasksContext from "./state-management/context/task-context";
import TaskList from "./state-management/TaskList";
import loginReducer from "./state-management/reducers/loginReducer";
import AuthContext from "./state-management/context/auth-context";

const App = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [user, authDispatch] = useReducer(loginReducer, "");

  return (
    <>
      <AuthContext.Provider value={{ user, dispatch: authDispatch }}>
        <TasksContext.Provider value={{ tasks, dispatch }}>
          <LoginStatus />
          <TaskList />
        </TasksContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
