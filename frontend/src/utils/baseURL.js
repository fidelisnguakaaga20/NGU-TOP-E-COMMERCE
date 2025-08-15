// export const getBaseURL = () => {
//     return "http://localhost:5000"
// }

export const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

  return url.replace(/\/+$/, '');
};
