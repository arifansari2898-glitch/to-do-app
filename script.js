const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

 
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

 
document.addEventListener("DOMContentLoaded", loadTasks);

 
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  
  li.querySelector(".task-text").onclick = function () {
    li.classList.toggle("completed");
    saveTasks();
  };

 
  li.querySelector(".delete-btn").onclick = function (e) {
    li.remove();
    saveTasks();
  };

  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
}

 
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

 
function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
  
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

 
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

 
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}