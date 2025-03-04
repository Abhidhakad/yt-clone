export const getAccessToken = () => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    console.log(urlParams.get("access_token"));
    return urlParams.get("access_token");
  };
  