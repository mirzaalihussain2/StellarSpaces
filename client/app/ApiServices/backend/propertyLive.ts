function getCookie(name: string) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}
const token = getCookie('token');

export async function makePropertyStatusLive(listingId: number) {
  try {
    const response = await fetch(
      `http://localhost:3010/listings/${listingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'live' }),
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
