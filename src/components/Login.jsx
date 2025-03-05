import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getAccessToken";

const CLIENT_ID =  import.meta.env.VITE_CLIENT_ID; // Replace with your actual Client ID
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI; // Change to your deployed domain

const Login = () => {
 
  const navigate = useNavigate();
  const handleLogin = () => {
    const authURL = `https://accounts.google.com/o/oauth2/v2/auth
      ?client_id=${CLIENT_ID}
      &redirect_uri=${encodeURIComponent(REDIRECT_URI)}
      &response_type=token
      &scope=https://www.googleapis.com/auth/youtube.readonly
      &include_granted_scopes=true
      &prompt=consent`.replace(/\s/g, "");
    window.location.href = authURL; // Redirect user to Google login
  };


  useEffect(() => {
    const token = getAccessToken();
    console.log(token);
    if (token) {
      localStorage.setItem("access_token", token); // Store token
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <h1 className="text-3xl font-bold mb-4">YouTube Login</h1>
    <button 
      onClick={handleLogin} 
      className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-600 transition"
    >
      Sign in with YouTube
    </button>
   
  </div>
  
  );
};

export default Login;