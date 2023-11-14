const landingSignUpButton = document.querySelector("#landing-view-signup-button");
const landingLoginButton = document.querySelector("#landing-view-login-button");

landingLoginButton.addEventListener("click", function() {
  window.location.href = "/login";
});

landingSignUpButton.addEventListener("click", function() {
  window.location.href = "/signup";
});