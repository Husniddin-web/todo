import React, { useEffect, useState } from "react";

const Todo = () => {
  const [tasks, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const [isReverse, setReverse] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  function handleTask() {
    if (!title.trim()) return;
    setTask([...tasks, { id: Date.now(), title, isCompleted: false }]);
    setTitle("");
  }

  function reverseTask() {
    setReverse(!isReverse);
  }

  function toggleComplete(id) {
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  function deleteTask(id) {
    setTask(tasks.filter((task) => task.id !== id));
  }

  function startEditTask(id, title) {
    setEditId(id);
    setEditTitle(title);
  }

  function saveEditTask(id) {
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editTitle } : task
      )
    );
    setEditId(null);
    setEditTitle("");
  }

  useEffect(() => {
    setTask([...tasks].reverse());
  }, [isReverse]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Task Manager</h1>

      <div className="flex items-center gap-4 bg-white p-4 shadow-md rounded-xl">
        <input
          type="text"
          placeholder="Enter a task..."
          className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleTask() : null)}
          value={title}
        />
        <button
          onClick={handleTask}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Add
        </button>
        <button
          onClick={reverseTask}
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-200"
        >
          Reverse
        </button>
      </div>

      <div className="mt-6 w-full max-w-md">
        {tasks.length === 0 ? (
          <h2 className="text-center text-gray-500 text-xl">No tasks yet</h2>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center"
              >
                {editId === task.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border-2 border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) =>
                      e.key === "Enter" ? saveEditTask(task.id) : null
                    }
                  />
                ) : (
                  <span
                    className={`text-lg ${
                      task.isCompleted
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {task.title}
                  </span>
                )}
                <div className="flex gap-2">
                  {editId === task.id ? (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                      onClick={() => saveEditTask(task.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-200"
                        onClick={() => startEditTask(task.id, task.title)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                      <button
                        style={{
                          backgroundColor: task.isCompleted
                            ? "gray"
                            : "#4F46E5",
                        }}
                        className="text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition duration-200"
                        onClick={() => toggleComplete(task.id)}
                      >
                        {task.isCompleted ? "Undo" : "Complete"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
