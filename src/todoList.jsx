import { use } from "react";
import TodoListAddItem from "./todoListAddItem";
import TodoListItem from "./todoListItem";
import TodoListUpdateItem from "./todoListUpdateItem";
import { useEffect, useState } from "react";
export default function TodoList() {
  const apiURL = "https://bismillakhans.pythonanywhere.com/";
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  function addTask() {
    if (!newTask) {
      return;
    }
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, { id: data.id, title: newTask }]);
        setNewTask("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }
  function getTask() {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
  }

  useEffect(() => {
    getTask();
  }, []);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }
  function deleteTask(index) {
    fetch(apiURL + index+"/", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // setTasks(tasks.filter((_, i) => i !== index));

        getTask();
      });
  }
  function updateTask(index) {
    setIsUpdate(true);
    // get the task to update
    fetch(apiURL + index + "/")
      .then((response) => response.json())
      .then((data) => {
        setNewTask(data.title);
        setCurrentTaskIndex(index);
      });
  }

  function updateSaveTask() {
    setIsUpdate(false);
    // const newTasks = [...tasks];
    // newTasks[currentTaskIndex].title = newTask;
    // setTasks(newTasks);
    // setNewTask("");
    fetch(apiURL + currentTaskIndex + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        getTask();
        setNewTask("");
      });
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
            deleteTask={() => deleteTask(task.id)}
            updateTask={() => updateTask(task.id)}
            taskId={index}
          />
        ))}
      </div>
    </>
  );
}
