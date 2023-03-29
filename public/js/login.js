$(document).ready(() => {

  const loginBtn = $('#login-button');
  const signupBtn = $('#signup-button');
  const loginForm = $('#login-form');
  const signupForm = $('#signup-form');
  const loginAlert = $('#login-error');
  const signupAlert = $('#create-error');
  const loginUser = $('#username-login');
  const loginPwd = $('#password-login');
  const signupUser = $('#username-signup');
  const signupPwd = $('#password-signup');
  const signupEmail = $('#email-signup');



  const loginFormHandler = async (e) => {
    e.preventDefault();

    loginAlert.text("");
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const message = await response.json();

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace("/");
      } else {
        loginError(message);
      }
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (username && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const message = await response.json();
      console.log(message);
      console.log(response);

      if (response.ok) {
        document.location.replace("/");
      } else {
        signupError(message);
      }
    }
  };

  loginForm.on("submit", loginFormHandler);
  signupForm.on("submit", signupFormHandler);

  function loginError(obj) {
    clearForms()
    loginAlert.text(obj.message);
  }

  function signupError(obj) {
    clearForms()
    signupAlert.text(obj.message);
  }

  function clearForms() {
    loginUser.val("");
    loginPwd.val("");
    signupUser.val("");
    signupPwd.val("");
    signupEmail.val("");
    loginAlert.text("");
    signupAlert.text("");
  }

});
