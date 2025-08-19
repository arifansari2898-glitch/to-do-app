const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // Load saved tasks
    document.addEventListener("DOMContentLoaded", loadTasks);

    function addTask() {
      if (taskInput.value.trim() === "") return;

      let li = document.createElement("li");
      li.innerHTML = `
        <span onclick="toggleTask(this)">${taskInput.value}</span>
        <span class="delete-btn" onclick="deleteTask(this)">X</span>
      `;
      taskList.appendChild(li);
      saveTasks();
      taskInput.value = "";
    }

    function toggleTask(task) {
      task.parentElement.classList.toggle("completed");
      saveTasks();
    }

    function deleteTask(task) {
      task.parentElement.remove();
      saveTasks();
    }

    function saveTasks() {
      localStorage.setItem("tasks", taskList.innerHTML);
    }

    function loadTasks() {
      taskList.innerHTML = localStorage.getItem("tasks") || "";
    }