import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  //const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {

    // Fetch YouTube Profile & Statistics
    const fetchYouTubeData = async () => {
      try {
        // Fetch Channel Details
        const response = await fetch(
          "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setUser(data.items[0]); // Store full channel data
          // fetchLatestVideos(data.items[0].id); // Fetch videos after getting Channel ID
        }
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
      }
    };

    // Fetch Latest Videos
    // const fetchLatestVideos = async (channelId) => {
    //   try {
    //     const response = await fetch(
    //       `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDA4QX7frmeNzrFHa-RkfBqC-VCJ31k7K0&channelId=${channelId}&part=snippet&order=date&maxResults=5`,
    //       { headers: { Authorization: `Bearer ${accessToken}` } }
    //     );
    //     const data = await response.json();
    //     console.log(data)
    //     setVideos(data.items || []);
    //   } catch (error) {
    //     console.error("Error fetching videos:", error);
    //   }
    // };

    fetchYouTubeData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {user ? (
        <>
          {/* Profile Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-full max-w-md">
            <img className="w-24 h-24 rounded-full mx-auto mb-3" src={user.snippet.thumbnails.high.url} alt="Profile" />
            <h1 className="text-3xl font-bold">{user.snippet.title}</h1>
            <p className="text-gray-400 text-sm">{user.snippet.description || "No description available"}</p>
            <div className="mt-4 flex justify-center space-x-4">
              <span className="bg-gray-700 px-4 py-2 rounded text-sm">Subscribers: {user.statistics.subscriberCount}</span>
              <span className="bg-gray-700 px-4 py-2 rounded text-sm">Videos: {user.statistics.videoCount}</span>
            </div>
          </div>

          {/* Latest Videos Section */}
          <div className="mt-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Latest Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video.id.videoId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                      <img className="w-full rounded" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                      <h3 className="text-lg font-semibold mt-2">{video.snippet.title}</h3>
                      <p className="text-gray-400 text-sm">{video.snippet.channelTitle}</p>
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No recent videos found.</p>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              navigate("/");
            }}
            className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
