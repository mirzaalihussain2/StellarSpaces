function getCookie(name: string) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}
const token = getCookie('token');

export const createCheckoutSession = async (listingId: string) => {
  try {
    const response = await fetch(
      'http://localhost:3010/stripe/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId }),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

