const BASE_URL = import.meta.env.VITE_API_URL || 'https://asa-awkum-server.vercel.app/api';

// ⏱️ Timeout helper
function timeoutPromise(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timeout')), ms)
  );
}

// 🔥 Core API function
export async function api(path, options = {}) {
  const token = localStorage.getItem('token');
  const controller = new AbortController();

  // 1. Check if the body is FormData (for file uploads)
  const isFormData = options.body instanceof FormData;

  // 2. Prepare headers
  const headers = {
    // We ONLY set application/json if we aren't sending a file.
    // If it's FormData, the browser must set the Content-Type automatically.
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  // 3. Prepare body
  // If it's FormData, leave it as is. If it's a regular object, stringify it.
  const body = isFormData 
    ? options.body 
    : (options.body ? JSON.stringify(options.body) : undefined);

  const fetchPromise = fetch(`${BASE_URL}${path}`, {
    ...options,
    signal: controller.signal,
    headers,
    body,
  });

  try {
    const response = await Promise.race([
      fetchPromise,
      timeoutPromise(10000),
    ]);

    if (!response.ok) {
      let errorMsg = `Request failed: ${response.status}`;

      try {
        const data = await response.json();
        errorMsg = data.message || errorMsg;
      } catch {
        // Fallback if response isn't JSON
      }

      throw new Error(errorMsg);
    }

    // Return JSON for all successful requests
    return response.json();
  } catch (error) {
    // Handle Abort or Timeout errors
    if (error.name === 'AbortError') throw new Error('Request was cancelled');
    throw error;
  }
}

// =====================
// 🔹 CLEAN HELPERS
// =====================

// GET with query params
export function get(path, params = {}) {
  const query = new URLSearchParams(params).toString();
  return api(`${path}${query ? `?${query}` : ''}`, { method: 'GET' });
}

// POST (Handles both JSON and FormData)
export function post(path, body) {
  return api(path, {
    method: 'POST',
    body, // Passed raw to api() to decide stringify vs formData
  });
}

// PUT (Handles both JSON and FormData)
export function put(path, body) {
  return api(path, {
    method: 'PUT',
    body,
  });
}

// DELETE
export function del(path) {
  return api(path, {
    method: 'DELETE',
  });
}