import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Layout from './components/Layout';
import tasksData from './data/tasks.json';
import './App.css'

function App() {
  const [tasks, setTasks] = useState(tasksData);
  const defaultTask = {
    title: "",
    id: null,
    description: "",
    deadline: null,
    tags: [],
    priority: false,
    image: "",
    completed: false,
    createdAt: null
  };

  const onCreate = newTask => {
    newTask.title.length > 0 && setTasks([newTask, ...tasks]);
  };

  const onUpdate = (task, id) => {
    let tempList = tasks;
    let index = tasks.findIndex(t => t.id === id);
    tempList[index] = task;
    setTasks([...tempList]);
  };
  const onDelete = (id) => {
    let tempList = tasks.filter(task => task.id !== id);
    setTasks(tempList);
  };

  useEffect(() => {
    let arr = localStorage.getItem("tasks");
    if (arr) {
      setTasks(JSON.parse(arr));
    }
  }, []);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);


  return (
    <Layout>
      <TodoList tasks={tasks} onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete} defaultTask={defaultTask} />
    </Layout>
  );
}

export default App;
