import { useEffect, useState, useCallback } from "react";
import { RiMenuFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { AiFillAudio } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLeftsidebar, setRightsidebar  } from "../redux/slices/constantSlice";
import { cacheResults } from "../redux/slices/searchSlice";
import SearchSuggestions from "./searchSuggestions";
import { YoutubeIcon } from "../icons/YoutubeIcon";

const Header = () => {

  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const searchCache = useSelector((state) => state.search);
  const { leftsidebar, rightsidebar } = useSelector((state) => state.constant);

  const toggleLeftSidebar = () => {
    dispatch(setLeftsidebar(!leftsidebar));
  };

  const toggleRightSidebar = () => {
    dispatch(setRightsidebar(!rightsidebar));
  };

  const getSearchSuggestions = useCallback(async () => {
    try {
      if (!searchInput.trim()) return;
      const response = await fetch(`${YOUTUBE_SEARCH_API}${searchInput}`);
      if (!response.ok) throw new Error("Failed to fetch search results");

      const json = await response.json();
      setSearchSuggestions(json[1] || []);

      dispatch(cacheResults({ [searchInput]: json[1] }));
    } catch (error) {
      console.error("Error fetching search result", error);
    }
  }, [searchInput, dispatch]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchCache[searchInput]) {
        setSearchSuggestions(searchCache[searchInput]);
      } else {
        getSearchSuggestions();
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchInput, getSearchSuggestions,searchCache]);

  return (
    <div className="bg-gray-50 dark:bg-neutral-800 py-2 px-6 text-2xl dark:text-white flex justify-between items-center fixed top-0 left-0 right-0 z-30">
      <div className="flex gap-4 items-center relative">
        <RiMenuFill
          onClick={toggleLeftSidebar}
          className="cursor-pointer"
          aria-label="Toggle Left Sidebar"
        />
        {/* yt logo */}
        <YoutubeIcon />

        <div className="absolute -top-2 left-34 text-[10px] text-gray-700">
          {user?.snippet?.country}
        </div>
      </div>

      <div className="flex gap-3 justify-center items-center">
        <div className="flex relative">
          <input
            className="px-4 w-lg border z-10 text-base py-1 border-gray-400 rounded-l-full focus:outline-0 focus:ring focus:ring-cyan-700"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            value={searchInput}
          />
          {searchInput.length > 0 && (
            <span
              onClick={() => setSearchInput("")}
              className="absolute right-16 top-1.5 cursor-pointer z-20"
            >
              <MdClear className="text-3xl cursor-pointer" />
            </span>
          )}
          <span className="py-2 px-4 border border-gray-400 rounded-r-full bg-gray-100 focus:ring focus:ring-cyan-700 hover:bg-gray-200">
            <CiSearch />
          </span>

          {(searchSuggestions.length > 0 && showSuggestions) && searchInput.length > 0 ? (
            <SearchSuggestions searchSuggestions={searchSuggestions} />
          ) : (
            ""
          )}
        </div>

        <div className="bg-gray-200/45 hover:bg-gray-200 rounded-full p-2">
          <AiFillAudio />
        </div>
      </div>

      <div
        onClick={toggleRightSidebar}
        className="relative w-10 flex items-center justify-center cursor-pointer"
      >
        <img
          loading="lazy"
          className="rounded-full mx-auto w-full "
          src={user?.snippet?.thumbnails?.high?.url || user?.picture}
          alt="avatar"
        />
      </div>
      
    </div>
  );
};

export default Header;
