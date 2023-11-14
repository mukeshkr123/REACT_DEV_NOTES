import AuthProvider from "./state-management/auth/AuthProvider";
import LoginStatus from "./state-management/auth/LoginStatus";
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
