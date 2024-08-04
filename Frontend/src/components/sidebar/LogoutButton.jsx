import React from "react";
import { CiLogout } from "react-icons/ci";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="upshadow1 p-2 mt-auto">
      <div className="flex gap-1 justify-center items-center cursor-pointer Logout " onClick={logout}>
        {loading ? (
          <>
            {" "}
            <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce"></div>
          </>
        ) : (
          <>
            <CiLogout className="text-xl" />
            <span >Logout</span>
          </>
        )}
      </div>
    </div>
  );
};

export default LogoutButton;
