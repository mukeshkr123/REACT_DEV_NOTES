import LoginStatus from "./state-management/auth/LoginStatus";
import Counter from "./state-management/counter/Counter";
import { TaskList, TasksProvider } from "./state-management/tasks";

const App = () => {
  return (
    <>
      <TasksProvider>
        <Counter />
        <LoginStatus />
        <TaskList />
      </TasksProvider>
    </>
  );
};

export default App;
