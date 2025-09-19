// export const getBaseUrl = () => {
//   const raw =
//     (import.meta && import.meta.env && import.meta.env.VITE_BACKEND_BASEURL) ||
//     "http://localhost:5000";
//   return raw.replace(/\/+$/, "");
// };

// const BASE_URL = getBaseUrl();
// export default BASE_URL;


// frontend/src/utils/baseURL.js
export const getBaseUrl = () => {
  const fromEnv = import.meta.env?.VITE_API_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const host = window.location.host;
    if (host.endsWith('vercel.app')) {
      return 'https://ngu-top-backend.onrender.com';
    }
  }
  return 'http://localhost:5000';
};
