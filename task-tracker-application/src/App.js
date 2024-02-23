import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    text: '',
    priority: 'Low',
    assignee: '',
    dueDate: '',
    dueTime: ''
  });

  const [editTask, setEditTask] = useState(null);

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };

  const addTask = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (newTask.text.trim() === '') {
      alert("Please enter task description.");
      return;
    }

    if (editTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editTask.id ? { ...editTask, ...newTask } : task
      );
      setTasks(updatedTasks);
      setEditTask(null);
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
    }
    setNewTask({
      text: '',
      priority: 'Low',
      assignee: '',
      dueDate: '',
      dueTime: ''
    });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTaskItem = (task) => {
    setEditTask(task);
    setNewTask(task);
  };

  return (
    <div className="container py-5">
      <section className="hero mb-5">
        <div className="text-center">
          <h1 className="display-4 fw-bold text-primary mb-4 animate__animated animate__fadeInDown">Welcome to the Task Tracker Application</h1>
          <p className="lead text-muted mb-4 animate__animated animate__fadeInUp">Your Ultimate Task Management Solution</p>
        </div>
      </section>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4 animate__animated animate__fadeInLeft">
            <div className="card-body">
              <h2 className="card-title mb-4 text-primary">Add/Edit Task</h2>
              <form onSubmit={addTask}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Task Description"
                    name="text"
                    value={newTask.text}
                    onChange={handleInputChange}
                  />
                  <select
                    className="form-select mb-2"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Assignee"
                    name="assignee"
                    value={newTask.assignee}
                    onChange={handleInputChange}
                  />
                  <div className="row">
                    <div className="col">
                      <input
                        type="date"
                        className="form-control mb-2"
                        name="dueDate"
                        value={newTask.dueDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col">
                      <input
                        type="time"
                        className="form-control mb-2"
                        name="dueTime"
                        value={newTask.dueTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    {editTask ? 'Update Task' : 'Add Task'}
                  </button>
                  {editTask && (
                    <button
                      className="btn btn-secondary btn-lg btn-block mt-3 d-grid"
                      onClick={() => setEditTask(null)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card animate__animated animate__fadeInRight">
            <div className="card-body">
              <h2 className="card-title mb-4 text-primary">Task List</h2>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Assignee</th>
                    <th>Due Date/Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td>{task.text}</td>
                      <td>
                        <span className={`badge ${task.priority === 'Low' ? 'bg-success' : task.priority === 'Medium' ? 'bg-warning' : 'bg-danger'}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td>{task.assignee}</td>
                      <td>{task.dueDate} {task.dueTime}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => editTaskItem(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
