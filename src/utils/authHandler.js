export const extractAccessToken = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const token = params.get("access_token");

  if (token) {
    localStorage.setItem("access_token", token);
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};
