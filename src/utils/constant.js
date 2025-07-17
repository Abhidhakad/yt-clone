export const navItems = [
    { id: "home", label: "Home" },
    { id: "videos", label: "Videos" },
    { id: "shorts", label: "Shorts" },
    { id: "playlists", label: "Playlists" },
    { id: "posts", label: "Posts"}
  ];
const GOOGLE_API_KEY = "AIzaSyDA4QX7frmeNzrFHa-RkfBqC-VCJ31k7K0"
export const YOUTUBE_VIDEOS_API ="https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const fetchVideosUrl = (pageToken = "") =>
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&pageToken=${pageToken}&key=${GOOGLE_API_KEY}`;
  

export const YOUTUBE_TRENDING_TOPICS = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=${GOOGLE_API_KEY}`;


export const YOUTUBE_SEARCH_API ="https://proxy-server-nuli.onrender.com/api/youtube-suggestions?q="