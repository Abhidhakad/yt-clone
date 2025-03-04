import { useEffect } from "react";
import Header from "./Header";
import { addUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const data = await response.json();
        if (data.items && data.items.length > 0) {
          dispatch(addUser(data?.items[0]));
        }
      } catch (error) {
        navigate("/login");
        console.error("Error fetching YouTube data:", error);
      }
    };
    fetchUserProfile();
  },[]);

  return (
    <div className="relative bg-gray-50 dark:bg-neutral-800 h-screen">
      <Header />
    </div>
  );
};

export default Body;
