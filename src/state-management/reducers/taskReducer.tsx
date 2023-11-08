interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD";
  task: Task;
}

interface DeleteTask {
  type: "DELETE";
  id: number;
}

type TaskAction = AddTask | DeleteTask;

const taskReducer = (tasks: Task[], action: TaskAction) => {
  switch (action.type) {
    case "ADD":
      return [...tasks, action.task];
    case "DELETE":
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
};

export default taskReducer;
