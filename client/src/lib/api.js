export async function api(path, options = {}) {
  const token = localStorage.getItem('adminToken');
  
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Only attach the Authorization header if a token exists
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || `Request failed: ${response.status}`);
  }

  return response.json();
}