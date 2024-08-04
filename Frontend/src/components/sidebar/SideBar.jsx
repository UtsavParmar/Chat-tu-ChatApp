import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
const SideBar = () => {
  return (
    <div className="bg-zinc-900  p-3 flex flex-col gap-3 h-[574px] rounded-l-[32px]">
      <SearchInput></SearchInput>
      <Conversations></Conversations>
      <LogoutButton></LogoutButton>
    </div>
  );
};

export default SideBar;
