function getCookie(name: string) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}
const token = getCookie('token');

// create local user function
async function createUsers(user: any) {
  const response = await fetch('http://localhost:3010/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error: ' + response.statusText);
  }
}

// login local user function
async function loginUser(user: any) {
  const response = await fetch('http://localhost:3010/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error: ' + response.statusText);
  }
}
// update user information function
async function updateUsers(id: number, user: any) {
  const response = await fetch(`http://localhost:3010/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error: ' + response.statusText);
  }
}

//delete user function
async function softDeleteUsers(id: number) {
  const response = await fetch(`http://localhost:3010/users/${id}/soft`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error: ' + response.statusText);
  }
}

async function findEmail(email: string) {
  const response = await fetch(`http://localhost:3010/users/exist/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error: ' + response.statusText);
  }
}

async function findUserById(id: number) {
  const response = await fetch(`http://localhost:3010/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error: ' + response.statusText);
  }
}
export { createUsers, loginUser, updateUsers, softDeleteUsers, findEmail,findUserById };
