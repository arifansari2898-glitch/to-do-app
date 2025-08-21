 function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
    if (!username || !password) {
    document.getElementById("error").innerText = "Please enter both username and password!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username] === password) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", username);
    window.location.href = "index.html";
  } else {
    document.getElementById("error").innerText = "Invalid username or password!";
}
}