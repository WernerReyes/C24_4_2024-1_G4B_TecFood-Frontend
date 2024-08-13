export const getEnvs = () => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_WEBSOCKET_URL: import.meta.env.VITE_WEBSOCKET_URL,
    VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    VITE_PAYPAL_CLIENT_ID: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  };
};
