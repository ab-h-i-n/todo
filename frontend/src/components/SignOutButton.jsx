import React from "react";
import secureLocalStorage from "react-secure-storage";

const SignOutButton = () => {

    const handleSignOut = () => {

        secureLocalStorage.clear();
        window.location.reload();

    }

  return (
    <div onClick={handleSignOut} className="hover:bg-red-400 cursor-pointer absolute shadow-lg shadow-themeShadow top-0 right-0 translate-x-[20px] translate-y-[-20px] bg-red-600 w-24 h-24 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 absolute top-9 right-9 text-white"
      >
        <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
      </svg>
    </div>
  );
};

export default SignOutButton;
