import AuthProvider from "./state-management/AuthProvider";
import LoginStatus from "./state-management/LoginStatus";
import { TaskList, TasksProvider } from "./state-management/tasks";

const App = () => {
  return (
    <>
      <AuthProvider>
        <TasksProvider>
          <LoginStatus />
          <TaskList />
        </TasksProvider>
      </AuthProvider>
    </>
  );
};

export default App;
