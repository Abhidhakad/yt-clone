import { useEffect, useState, useCallback } from "react";
import { YOUTUBE_TRENDING_TOPICS, fetchVideosUrl } from "../utils/constant";
import TrendingTopics from "./TrendingTopics";
import Videos from "./Videos";

const Body = () => {
  const [videos, setVideos] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const [hasMoreVideos, setHasMoreVideos] = useState(true); 

  const fetchTrendingTopics = async () => {
    setLoading(true);
    try {
      const response = await fetch(YOUTUBE_TRENDING_TOPICS);
      if (!response.ok) throw new Error(`Error fetching trending topics: ${response.status}`);
      
      const data = await response.json();
      setTrendingTopics(data?.items || []);
      fetchVideos();
    } catch (error) {
      console.error("Error fetching trending topics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = useCallback(async (pageToken = "") => {
    if (!hasMoreVideos || loading) return;

    setLoading(true);
    try {
      const response = await fetch(fetchVideosUrl(pageToken));
      if (!response.ok) throw new Error(`Error fetching videos: ${response.status}`);

      const data = await response.json();
      setVideos((prevVideos) => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken || "");

      if (!data.nextPageToken) setHasMoreVideos(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMoreVideos]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMoreVideos && !loading) {
        fetchVideos(nextPageToken);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchVideos, nextPageToken, loading, hasMoreVideos]);

  useEffect(() => {
    fetchTrendingTopics();
  },[]);

  return (
    <div className="bg-transparent min-h-screen text-white">
      <main className="pt-20 pl-28 px-6 relative">
        {trendingTopics.length > 0 && <TrendingTopics topics={trendingTopics} />}
        {videos.length > 0 ? <Videos videos={videos} /> : <p className="text-center">No videos available</p>}
        {loading && <p className="text-center">Loading more videos...</p>}
      </main>
    </div>
  );
};

export default Body;


