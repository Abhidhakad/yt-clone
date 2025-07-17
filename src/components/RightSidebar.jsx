import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { BsMoon } from "react-icons/bs";
import { WiDaySunny } from "react-icons/wi";
import { setRightsidebar } from "../redux/slices/constantSlice";

const RightSidebar = () => {
  const rightsidebar = useSelector((state) => state.constant.rightsidebar);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url  = user?.snippet?.thumbnails?.high?.url || user?.picture;
  const title  = user?.snippet?.localized.title || user?.name;
  const username = user?.snippet?.customUrl || user?.email;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
    
  }
  return (
    <div
      className={`fixed top-2 rounded-2xl right-20 w-70 shadow-2xl h-auto bg-gray-100 text-stone-800 scroll-auto border border-gray-200 z-50 transform ${
        rightsidebar ? "opacity-100" : "opacity-0"
      } transition-transform duration-300`}
    >
      <div className="flex gap-2 pb-2 px-4 pt-4">
        <img src={url} alt="avtar" className="w-12 h-full rounded-full" />
        <div className="not-even:">
          <h2 className="text-[16px]">{title ? title : "User Title"}</h2>
          <p>{username? username : "@Username"}</p>
          <Link
          onClick={() => dispatch(setRightsidebar(false)) }
            to={username && user?.email ? "#":`/${username}`}
            className=" bg-blue-600 pt-1 font-normal bg-clip-text text-transparent text-[14px] cursor-pointer"
          >
            {user?.email ? "Create a channel":"View your channel"}
          </Link>
        </div>
      </div>
      <div className="border-t border-t-gray-300">
        <div className="flex items-center gap-5 px-4 py-2 cursor-pointer">
          <FaGoogle className="text-xl" />
          <p className="text-neutral-800 text-sm">Google Account</p>
        </div>
      </div>
      <div className="flex items-center gap-5 px-4 py-2 cursor-pointer">
        <PiSignOut className="text-xl" />
        <p onClick={handleLogout} className="text-neutral-800 text-sm"> Sign out</p>
      </div>
    </div>
  );
};

export default RightSidebar;
