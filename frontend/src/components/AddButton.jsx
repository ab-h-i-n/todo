import React from "react";

const AddButton = ({setModalOpen}) => {
  return (
    <div onClick={()=>setModalOpen(true)} className="down-bg fixed bottom-0 p-10 w-full flex justify-center">
      <div className="cursor-pointer grid place-items-center bg-themeBlue shadow-lg shadow-themeShadow rounded-full h-[80px] w-[80px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-white "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
};

export default AddButton;
