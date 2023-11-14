import { useContext } from "react";
import TasksContext from "../context/task-context";

const useTask = () => useContext(TasksContext);

export default useTask;
