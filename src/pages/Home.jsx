import { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "../components/Leftsidebar";
import RightSidebar from "../components/RightSidebar";
import { setLeftsidebar, setRightsidebar } from "../redux/slices/constantSlice";
import { Outlet } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth";
import { addUser } from "../redux/slices/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { userData, loading } = useUserAuth();
  const leftsidebar = useSelector((state) => state.constant.leftsidebar);
  const isSidebarOpen = leftsidebar;

  useEffect(() => {
    if (userData) {
      dispatch(addUser(userData));
    }
  }, [dispatch,userData]);

  const handleCloseSidebar = () => {
    if (leftsidebar) {
      dispatch(setRightsidebar(false));
      dispatch(setLeftsidebar(false));
    }
  };

  return (
    <div className="relative bg-gray-50 dark:bg-neutral-800 h-screen">
      {loading ? (
        <div className="flex justify-center mt-52">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex flex-col">
          <Header />
          <LeftSidebar />
          <RightSidebar />
          <Outlet />
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

export default Home;


