export const getBaseUrl = () => {
  const raw =
    (import.meta && import.meta.env && import.meta.env.VITE_BACKEND_BASEURL) ||
    "http://localhost:5000";
  return raw.replace(/\/+$/, "");
};

const BASE_URL = getBaseUrl();
export default BASE_URL;
