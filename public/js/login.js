const loginForm = document.querySelector("#login-form");
const loginUserButton = document.querySelector("#login-user-button");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  
  const response = fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.href = "/";
  }
  else {
    loginUserButton.classList.remove("btn-dark");
    loginUserButton.classList.add("btn-danger");
    loginUserButton.textContent = "Please try again";
    setTimeout(function () {
      loginUserButton.classList.remove("btn-danger");
      loginUserButton.classList.add("btn-dark");
      loginUserButton.textContent = "Login";
    }, 4000);
  }
});