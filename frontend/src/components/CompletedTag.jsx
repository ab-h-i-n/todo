import React from "react";

const CompletedTag = () => {
  return (
    <div className="absolute bg-green-500 z-50 rotate-[-45deg] translate-x-[-67px] translate-y-[-20px] w-[150px] h-[50px] text-sm text-white">
      <span className="absolute bottom-1 left-[45%] translate-x-[-50%]">
        Completed
      </span>
    </div>
  );
};

export default CompletedTag;
