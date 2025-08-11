const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  const tasks = getTasks();
  tasks.forEach((task) => renderTask(task));
}

function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const infoDiv = document.createElement("div");
  infoDiv.className = "task-info";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleCompleted(task.id));

  const nameSpan = document.createElement("span");
  nameSpan.className = "task-name";
  nameSpan.textContent = task.name;
  if (task.completed) nameSpan.classList.add("completed");

  infoDiv.appendChild(checkbox);
  infoDiv.appendChild(nameSpan);

  const btnDiv = document.createElement("div");
  btnDiv.className = "task-buttons";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => editTask(task.id);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => deleteTask(task.id);

  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);

  taskDiv.appendChild(infoDiv);
  taskDiv.appendChild(btnDiv);
  taskList.appendChild(taskDiv);
}

function addTask(name) {
  const tasks = getTasks();
  const newTask = {
    id: Date.now(),
    name,
    completed: false
  };
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks();
}

function toggleCompleted(id) {
  const tasks = getTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
  }
}

function editTask(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  const newName = prompt("Edit task:", task.name);
  if (newName !== null && newName.trim() !== "") {
    task.name = newName.trim();
    saveTasks(tasks);
    renderTasks();
  }
}

function deleteTask(id) {
  const tasks = getTasks().filter((task) => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName !== "") {
    addTask(taskName);
    taskInput.value = "";
  }
});

window.onload = renderTasks;
