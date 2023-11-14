import AuthProvider from "./state-management/auth/AuthProvider";
import LoginStatus from "./state-management/auth/LoginStatus";
import Counter from "./state-management/counter/Counter";
import { TaskList, TasksProvider } from "./state-management/tasks";

const App = () => {
  return (
    <>
      <AuthProvider>
        <TasksProvider>
          <Counter />
          <LoginStatus />
          <TaskList />
        </TasksProvider>
      </AuthProvider>
    </>
  );
};

export default App;
