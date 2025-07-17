import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { navItems } from "../utils/constant"

const Channel = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("access_token");
  const [videos, setVideos] = useState([]);
  const [active, setActive] = useState("home")

  const getUploadedVideos = async (playlistId) => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=12&access_token=${accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.items) {
        setVideos(data.items);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    console.log("user in channel: ",user);
    if (user?.contentDetails?.relatedPlaylists?.uploads) {
    getUploadedVideos(user.contentDetails.relatedPlaylists.uploads);
  }
  }, [navigate,user,accessToken]);

  return (
    <div className="pt-14 pl-20 min-h-screen bg-gray-50 text-white">
      {user && (
        <div>
          {/* Channel Banner */}
          <div
            className="w-[90%] mx-auto border rounded-2xl h-52 md:h-46 bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${user.brandingSettings?.image?.bannerExternalUrl})`,
            }}
          ></div>

          {/* Channel Info */}
          <div className="px-6 pt-5 md:px-10 flex-col text-neutral-800">
            <div className="flex">
            <img
              src={user.snippet.thumbnails.high.url}
              loading="eager"
              alt="Channel Profile"
              className="w-28 h-28 md:w-36 md:h-36 rounded-full"
            />

            <div className="ml-5">
              <h1 className="text-2xl md:text-4xl font-bold">
                {user.snippet.title}
              </h1>
              <div className="flex items-center gap-2 font-medium">
                <p className="text-black font-medium">
                  {user.snippet?.customUrl}
                </p>
                <p className="text-sm text-gray-600">
                  • {user.statistics.subscriberCount} subscribers •{" "}
                  {user.statistics.videoCount} videos
                </p>
              </div>
              <p className="text-gray-600 whitespace-pre-line">
                {user.snippet.description}
              </p>

              <div className="flex gap-3 mt-2">
                <button className="px-3 py-2 bg-gray-200 rounded-2xl text-black text-sm font-medium hover:bg-gray-300">
                  <Link
                    to={`https://studio.youtube.com/channel/${user.contentDetails?.id}/editing/profile`}
                    target="_blank"
                  >
                    Customise channel
                  </Link>
                </button>
                <button className="px-3 py-2 bg-gray-200 rounded-2xl text-black text-sm font-medium hover:bg-gray-300">
                  <Link
                    to={`https://studio.youtube.com/channel/${user.contentDetails?.id}/videos`}
                    target="_blank"
                  >
                    Manage videos
                  </Link>
                </button>
              </div>
            </div>
            </div>
          </div>

          <div className="sticky top-14 bg-gray-50 pt-3 z-20">
          <ul className="flex mx-10 mt-8 gap-5 text-gray-600 font-medium">
              {
                navItems.map((item) => {
                  return <li 
                  className={`cursor-pointer hover:text-gray-950  ${active=== item.id?"text-gray-950":""}`}
                  key={item.id}
                  onClick={()=> setActive(item.id)}
                  >
                    {item.label}
                    {active === item.id && <div className="border-b-2 border-black mt-1"></div>}
                   
                  </li>
                })
              }
            </ul>
          </div>

          {/* Uploaded Videos */}
          <div className="p-5 md:p-10 text-neutral-950">
            <h2 className="text-xl font-bold mb-5">For you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.length > 0 && videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-100 p-3 rounded-lg shadow-lg"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full h-40 object-cover -z-50 rounded-lg transform hover:scale-105 transition-all"
                    />
                    <h3 className="mt-3 text-sm font-semibold">
                      {video.snippet.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {new Date(video.snippet.publishedAt).toLocaleDateString()}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* If No Channel Data */}
      {!user && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg">Loading channel details...</p>
        </div>
      )}
    </div>
  );
};

export default Channel;
