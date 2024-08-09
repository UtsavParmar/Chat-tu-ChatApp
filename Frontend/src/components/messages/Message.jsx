import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSelectedContext } from "../../context/SelectedContext";
import { extractTime } from "../../../utils/extractTime";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const Message = ({ message, onDelete }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useSelectedContext();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);

  const deleteMessage = async () => {
    try {
      const messageId = String(message._id); // Convert _id to string if necessary
      console.log("Message ID type:", typeof messageId);
      console.log("Message ID value:", messageId);

      // Emit the delete message event to the server
      socket.emit("deleteMessage", { messageId, conversationId: selectedConversation._id });

      // Optionally, you could also call an API to delete the message on the server
      await axios.delete(`http://localhost:8000/messages/delete/${messageId}`);
      
      // Notify the parent component about the deletion
      onDelete(messageId); 
    } catch (error) {
      console.error("Error deleting message:", error.response?.status, error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // Listen for the messageDeleted event from the server
    socket.on("messageDeleted", ({ messageId }) => {
      // Handle the message deletion in the UI if necessary
      // For example, you can filter out the deleted message from the state
      if (message._id === messageId) {
        // Perform UI update for message deletion
        onDelete(messageId);
      }
    });
  }, [message._id, onDelete]);

  return (
    <>
      {!fromMe ? (
        <div className="chat-message py-2">
          <div className="flex items-end">
            <img
              src={selectedConversation.profimg}
              alt="Profile"
              className="w-6 h-6 rounded-full"
            />
            <div className="flex  space-y-2 text-xs max-w-xs mx-2 order-1 items-start">
              <div className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#242424] text-gray-100">
                <span>{message.message}</span>
              </div>
              
            </div>
          </div>
          <p className="text-right text-[0.65rem] text-grey-dark">
            {formattedTime}
          </p>
        </div>
      ) : (
        <div className="chat-message py-2">
          <div className="flex items-end justify-end">
            <img
              src={authUser.prof_pic}
              alt="Profile"
              className="w-6 h-6 rounded-full order-2"
            />
            <div className="flex  space-y-2 text-xs max-w-xs mx-2 items-end">
              <div className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-100 text-[#242424]">
                <span className="font-semibold">{message.message}</span>
                <IoCheckmarkDoneSharp
                  className={`ml-3 inline-block ${message.seen ? "text-green-500" : ""} text-base font-extrabold`}
                />
              </div>
              <MdDelete 
                className="text-red-500 cursor-pointer ml-2"
                onClick={deleteMessage} // Call deleteMessage function here
              />
            </div>
          </div>
          <p className="text-right text-[0.65rem] text-grey-dark mt-1">
            {formattedTime}
          </p>
        </div>
      )}
    </>
  );
};

export default Message;
