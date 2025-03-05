import React from "react";
import { useSelector } from "react-redux";

const RightSidebar = () => {
  const rightsidebar = useSelector((state) => state.constant.rightsidebar);

  console.log("Right Sidebar State:", rightsidebar);

  return (
    <div
    className={`fixed top-0 right-0 w-64 h-full bg-gray-50 text-black shadow-lg border border-gray-200 z-50 transform ${
      rightsidebar ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300`}
    >
      <h2 className="text-lg font-semibold">Right Sidebar</h2>
      <p>This is the right sidebar content.</p>
    </div>
  );
};

export default RightSidebar;
