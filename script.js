const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// 🔒 Prevent access without login
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task (called by button or Enter key)
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Toggle completed on span click
  li.querySelector(".task-text").onclick = function () {
    li.classList.toggle("completed");
    saveTasks();
  };

  // Delete task on button click
  li.querySelector(".delete-btn").onclick = function (e) {
    li.remove();
    saveTasks();
  };

  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Load tasks from localStorage
function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
  // Re-attach event handlers after loading
  Array.from(taskList.children).forEach(li => {
    const span = li.querySelector(".task-text");
    const btn = li.querySelector(".delete-btn");
    if (span) {
      span.onclick = function () {
        li.classList.toggle("completed");
        saveTasks();
      };
    }
    if (btn) {
      btn.onclick = function () {
        li.remove();
        saveTasks();
      };
    }
  });
}

// Add task on Enter key
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}