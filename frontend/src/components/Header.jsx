import React from "react";

const Header = () => {
  return (
    <div className="merinda pt-10 pb-5  font-black relative top-0 flex justify-center w-full">
      <div className="text-6xl lg:text-[7rem] text-[#3a384d] drop-shadow-lg ">Todo</div>
      <div className="text-2xl lg:text-[3rem] absolute bottom-0 translate-x-12 text-themeBlue  drop-shadow-lg">App</div>
    </div>
  );
};

export default Header;
