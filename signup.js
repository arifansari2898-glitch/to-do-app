function signup(event) {
  event.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!username || !password) {
    document.getElementById("msg").innerText = "Please fill all fields.";
    return;
  }

  // Get existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    document.getElementById("msg").innerText = "User already exists!";
    return;
  }

  // Save new user
  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("msg").style.color = "green";
  document.getElementById("msg").innerText = "Account created! Go to login.";
  setTimeout(() =>{ window.location.href = "login.html";}, 1500);
}