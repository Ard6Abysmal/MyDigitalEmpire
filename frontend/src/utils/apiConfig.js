// List of possible API endpoints (in priority order)
const API_ENDPOINTS = [
  'http://10.189.113.33:8000',  // Primary network IP
  'http://10.10.19.60:8000',    // Secondary network IP
  'http://localhost:8000',       // Local development
  'http://127.0.0.1:8000',       // Local fallback
];

// Cache the working endpoint
let cachedWorkingEndpoint = null;

/**
 * Health check for a single endpoint
 */
async function checkEndpoint(url, timeout = 2000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${url}/api/resume/data`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    clearTimeout(timeoutId);
    return false;
  }
}

/**
 * Find the first working API endpoint
 */
async function detectWorkingEndpoint() {
  // Return cached endpoint if available
  if (cachedWorkingEndpoint) {
    return cachedWorkingEndpoint;
  }

  console.log('🔍 Detecting working API endpoint...');

  // Try all endpoints in parallel
  const checks = API_ENDPOINTS.map(async (endpoint) => {
    const isWorking = await checkEndpoint(endpoint);
    return { endpoint, isWorking };
  });

  const results = await Promise.all(checks);

  // Find first working endpoint
  const working = results.find(r => r.isWorking);

  if (working) {
    cachedWorkingEndpoint = working.endpoint;
    console.log('✅ Using API endpoint:', cachedWorkingEndpoint);
    return cachedWorkingEndpoint;
  }

  // Fallback to environment variable or first endpoint
  const fallback = import.meta.env.VITE_API_URL || API_ENDPOINTS[0];
  console.warn('⚠️ No working endpoint found, using fallback:', fallback);
  return fallback;
}

/**
 * Get the API URL (with auto-detection)
 */
export async function getApiUrl() {
  return await detectWorkingEndpoint();
}

/**
 * Reset cached endpoint (useful for debugging)
 */
export function resetApiCache() {
  cachedWorkingEndpoint = null;
  console.log('🔄 API cache reset');
}

/**
 * Get current cached endpoint
 */
export function getCurrentApiUrl() {
  return cachedWorkingEndpoint || API_ENDPOINTS[0];
}
