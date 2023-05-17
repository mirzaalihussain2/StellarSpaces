function getCookie(name: string) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}
const token = getCookie('token');

async function createFavourite(userId: number, listingId: number) {
  const response = await fetch('http://localhost:3010/favourites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, listingId: listingId }),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error: ' + response.statusText);
  }
}

async function deleteFavourite(userId: number, listingId: number) {
  const response = await fetch('http://localhost:3010/favourites', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: userId, listingId: listingId }),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error: ' + response.statusText);
  }
}

async function fetchLikedListings(userId: number) {
  const response = await fetch(
    `http://localhost:3010/favourites/user/${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userId),
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error: ' + response.statusText);
  }
}

export { createFavourite, deleteFavourite, fetchLikedListings };
