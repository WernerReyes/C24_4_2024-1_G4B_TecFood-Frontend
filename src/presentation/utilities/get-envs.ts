export const getEnvs = () => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  };
};
