import AuthProvider from "./state-management/AuthProvider";
import LoginStatus from "./state-management/LoginStatus";
import TaskList from "./state-management/TaskList";
import TasksProvider from "./state-management/TasksProvider";

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
