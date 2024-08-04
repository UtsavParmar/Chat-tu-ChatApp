import React, { useState } from "react";
import { useSelectedContext } from "../../context/SelectedContext";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useSelectedContext();
  const {onlineUsers}=useSocketContext()
  
  return (
    <div
      className={`p-2 ${
        !lastIdx ? "border-b border-gray-600" : ""
      } border-dotted flex cursor-pointer hover:bg-[#334634] hover:rounded-md ${
        selectedConversation?._id === conversation._id
          ? "bg-[#334634] rounded-md"
          : ""
      }`}
      onClick={() => {
        setSelectedConversation(conversation);
      }}
    >
      <div className="prof-shadow flex justify-center items-center rounded-full relative">
        <img
          src={conversation.profimg}
          className="w-11 h-11 rounded-full "
          alt="profile_image"
        />
        <span className={onlineUsers.includes(conversation._id)?"online":""}></span>
      </div>
      <div className="flex flex-col flex-1 justify-center">
        <div className="p-2">
          <p className="font-bold text-gray-100">{conversation.fullName}</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
