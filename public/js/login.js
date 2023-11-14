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
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    if (data.code == 200) {
      window.location = "/";
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
});