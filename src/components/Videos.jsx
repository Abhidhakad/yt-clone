import timeAgo from "../utils/convertDateTime";

const Videos = ({ videos }) => {

  return (
    <div className="mt-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {videos &&
        videos.map((video,index) => (
          <div
            key={index}
            className="bg-gray-50 text-neutral-950 rounded-lg overflow-hidden"
          >
            <img
              src={video?.snippet?.thumbnails?.high?.url}
              alt={video?.snippet?.title}
              className="w-full h-50 object-cover rounded-lg"
            />
            <div className="p-4 cursor-pointer">
              <h3 className="font-semibold">
                {video?.snippet?.title.slice(0, 50)}...
              </h3>
              <p className="text-[16px] text-gray-600 hover:text-gray-800 cursor-pointer">
                {video?.snippet?.channelTitle}
              </p>
              <p className="text-[14px] text-gray-500">
                {video?.statistics?.viewCount} views • <span>{timeAgo(video?.snippet?.publishedAt)}</span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Videos;
