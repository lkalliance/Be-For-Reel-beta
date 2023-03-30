const logout = async (e) => {
  // user has clicked the logout link
  e.preventDefault();

  // let the API know it happened
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // if everything cool, send user to the home page
    document.location.replace('/');
  } else {
    // if not, let them know
    alert('Failed to log out.');
  }
};

// attach listener
document.querySelector('#logout').addEventListener('click', logout);
