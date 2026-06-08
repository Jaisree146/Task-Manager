import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        task: task,
        completed: false,
        description: description,
      },
    ]);

    setTask("");
    setDescription("");
  }

  function toggleTask(indexToToggle) {
    const updated = tasks.map((t, index) => {
      if (index === indexToToggle) {
        return {
          ...t,
          completed: !t.completed,
        };
      }

      return t;
    });

    setTasks(updated);
  }

  function deleteTask(indexToDelete) {
    const updated = tasks.filter((_, index) => index !== indexToDelete);

    setTasks(updated);
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="input-section">
        <input
          type="text"
          value={task}
          placeholder="Enter Task"
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="text"
          value={description}
          placeholder="Enter Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      {tasks.map((t, index) => (
        <div className="task" key={index}>
          <div>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(index)}
            />

            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                marginLeft: "10px",
              }}
            >
              {t.task}
            </span>
            <h3>{t.task}</h3>
            <p>{t.description}</p>
          </div>

          <button onClick={() => deleteTask(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
