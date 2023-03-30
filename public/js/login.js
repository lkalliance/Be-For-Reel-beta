$(document).ready(() => {
  // front end javascript for login/create page

  // collect containers
  const loginForm = $('#login-form');
  const signupForm = $('#signup-form');
  const loginAlert = $('#login-error');
  const signupAlert = $('#create-error');
  const loginUser = $('#username-login');
  const loginPwd = $('#password-login');
  const signupUser = $('#username-signup');
  const signupPwd = $('#password-signup');
  const signupEmail = $('#email-signup');

  // create listeners
  const loginFormHandler = async (e) => {
    // user has clicked to log in
    e.preventDefault();

    // clear any alerts and get the values
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
        // if everything cool, send user to the home page
        document.location.replace("/");
      } else {
        // if not, let them know why
        loginError(message);
      }
    }
  };

  const signupFormHandler = async (event) => {
    // user has clicked to sign up
    event.preventDefault();

    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (username && email && password) {
      // make a call to the API to create the user
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const message = await response.json();
      
      if (response.ok) {
        // if everything cool, send user to the home page
        document.location.replace("/");
      } else {
        // if not, let them know why
        signupError(message);
      }
    }
  };

  loginForm.on("submit", loginFormHandler);
  signupForm.on("submit", signupFormHandler);

  // some utility functions
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
