export const getAccessToken = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  return params.get("access_token");
};
