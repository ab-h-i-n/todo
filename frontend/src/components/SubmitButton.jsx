import React from "react";

const SubmitButton = ({ text, isLoading }) => {
  return (
    <button className={`shadow-lg flex justify-center shadow-themeShadow ${isLoading ? 'bg-themeBlueLight cursor-progress' : 'bg-themeBlue hover:bg-themeBlueLight'} py-2 px-3 lg:text-lg lg:py-3 lg:px-4 rounded-md text-white`}>
      {isLoading ? <span className="loader text-[1.1rem]"></span> : text}
    </button>
  );
};

export default SubmitButton;
