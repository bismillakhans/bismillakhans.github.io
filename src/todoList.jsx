import TodoListAddItem from "./todoListAddItem";
import TodoListItem from "./todoListItem";
import TodoListUpdateItem from "./todoListUpdateItem";
import { useState } from "react";
export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "task1" },
    { id: 2, title: "task2" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  function addTask() {
    if (!newTask) {
      return;
    }
    setTasks([...tasks, { id: tasks.length + 1, title: newTask }]);
    setNewTask("");
  }




  function handleInputChange(event) {
    setNewTask(event.target.value);
  }
  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }
  function updateTask(index) {
    setIsUpdate(true);
    setNewTask(tasks[index].title);
    setCurrentTaskIndex(index);
  }

  function updateSaveTask() {
    setIsUpdate(false);
    const newTasks = [...tasks];
    newTasks[currentTaskIndex].title = newTask;
    setTasks(newTasks);
    setNewTask("");
  }
  return (
    <>
      <div className="container">
        {!isUpdate && (
          <TodoListAddItem
            value={newTask}
            handleInputChange={handleInputChange}
            addTask={addTask}
          />
        )}
        {isUpdate && (
          <TodoListUpdateItem
            value={newTask}
            handleInputChange={handleInputChange}
            updateSaveTask={updateSaveTask}
          />
        )}
        {tasks.map((task, index) => (
          <TodoListItem
            key={task.id}
            task={task.title}
            deleteTask={() => deleteTask(index)}
            updateTask={() => updateTask(index)}
            taskId={index}
          />
        ))}
      </div>
    </>
  );
}
