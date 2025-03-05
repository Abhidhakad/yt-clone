import { useEffect, useCallback, useState } from "react";
import Header from "./Header";
import { addUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "./Leftsidebar";
import RightSidebar from "./RightSidebar"
import { setLeftsidebar, setRightsidebar } from "../redux/slices/constantSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);
  const leftsidebar = useSelector((state) => state.constant.leftsidebar);
  const isSidebarOpen = leftsidebar;

  const handleCloseSidebar = () => {
    if (leftsidebar) {
      dispatch(setRightsidebar(false));
      dispatch(setLeftsidebar(false));
    }
  };

  const fetchUserProfile = useCallback(async () => {
    if (!accessToken) return;

    try {
      setLoading(true);
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status === 401) {
        console.error("Access token expired. Logging out...");
        localStorage.removeItem("access_token");
        navigate("/login");
        return;
      }

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        dispatch(addUser(data.items[0]));
      }
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
      localStorage.removeItem("access_token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [accessToken, dispatch, navigate]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
  }, [accessToken, fetchUserProfile]);

  return (
    <div
    className="relative bg-gray-50 dark:bg-neutral-800 h-screen">
      {loading ? (
        <div className="flex justify-center mt-52">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div
        onClick={()=> setRightsidebar(false)} 
        className="relative">
          <Header />
          <LeftSidebar />
          <RightSidebar />
          {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-800/30 z-40 transition-opacity duration-300"
            onClick={handleCloseSidebar} 
          ></div>
        )}
        </div>
      )}
    </div>
  );
};

export default Body;
