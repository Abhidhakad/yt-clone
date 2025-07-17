import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TrendingTopics = ({ topics }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState("All");

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 py-3 px-1 fixed top-14 left-27 right-0 text-neutral-950 flex items-center">
      {showLeft && (
        <div className="absolute left-0 w-20 bg-gradient-to-l from white via-gray-50 to-white">
          <button
            onClick={() => scroll("left")}
            className=" px-2 py-2 -top-5 bg-transparent p-2 cursor-pointer hover:bg-gray-500 transition hidden md:flex hover:rounded-full"
          >
            <FiChevronLeft className="text-xl" />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth mx-auto w-full"
      >
        <p
          onClick={() => setSelectedTopic("All")}
          className={`px-4 py-2 bg-gray-200 text-sm md:text-md font-medium rounded-lg cursor-pointer whitespace-nowrap transition-all
            ${
              selectedTopic === "All"
                ? "bg-neutral-900 text-white"
                : "hover:bg-gray-300"
            }`}
        >
          All
        </p>
        {topics.map((t,index) => (
          <p
            key={index}
            onClick={() => setSelectedTopic(t.snippet?.title)}
            className={`px-4 py-2 bg-gray-200 text-sm md:text-md font-medium rounded-lg cursor-pointer whitespace-nowrap transition-all
             ${
               selectedTopic === t.snippet?.title
                 ? "bg-neutral-900 text-white"
                 : "hover:bg-gray-300"
             }`}
          >
            {t.snippet?.title}
          </p>
        ))}
      </div>

      {showRight && (
        <div className="absolute right-0 w-20 bg-gradient-to-r from white via-gray-50 to-white flex items-center justify-end">
          <button
          onClick={() => scroll("right")}
           className=" px-2 py-2 bg-transparent p-2 cursor-pointer hover:bg-gray-500 transition hidden md:flex hover:rounded-full"
        >
          <FiChevronRight className="text-xl" />
        </button>
        </div>
      )}
    </div>
  );
};

export default TrendingTopics;
