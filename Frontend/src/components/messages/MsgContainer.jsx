import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import Whiteboard from "./Whiteboard/Whiteboard";
import { TiMessages } from "react-icons/ti";
import { useSelectedContext } from "../../context/SelectedContext";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import axios from 'axios';

const MsgContainer = () => {
  const { selectedConversation, setSelectedConversation } = useSelectedContext();
  const { socket } = useSocketContext();
  
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/messages/${selectedConversation._id}`);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (!socket) return;

    socket.on("typing", ({ senderId }) => {
      if (selectedConversation?._id === senderId) {
        setIsTyping(true);
      }
    });

    socket.on("stopTyping", ({ senderId }) => {
      if (selectedConversation?._id === senderId) {
        setIsTyping(false);
      }
    });

    socket.on("messageDeleted", ({ messageId }) => {
      setMessages(prevMessages => prevMessages.filter(msg => msg._id !== messageId));
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("messageDeleted");
    };
  }, [socket, selectedConversation?._id]);

  const toggleWhiteboard = () => {
    setShowWhiteboard(prev => !prev);
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter((message) => message._id !== messageId));
    
    socket.emit("deleteMessage", { messageId });
  };

  return (
    <div className="col-span-2 bg-zinc-900 p-3 flex flex-col gap-3 h-full rounded-r-[32px]">
      <div className="flex flex-col h-[550px] upshadow1 p-2 gap-3">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="bg-[#242424] p-4 rounded-[12px] flex justify-between items-center">
              <div>
                <span className="label-text">To: </span>
                <span className="text-gray-100 font-bold">{selectedConversation.fullName}</span>
                {isTyping ? (
                  <p className="text-left text-[0.65rem] text-green-500">Typing...</p>
                ) : (
                  <p className="p-[0.34rem]"> </p>
                )}
              </div>
              <button
                className="text-white text-xs px-2 py-1 rounded hover:bg-gray-500 transition"
                onClick={toggleWhiteboard}
              >
                {showWhiteboard ? "Hide Whiteboard" : "Show Whiteboard"}
              </button>
            </div>
            {showWhiteboard && <Whiteboard isVisible={showWhiteboard} />}
            
            <Messages onDeleteMessage={handleDeleteMessage} />
            <MessageInput />
          </>
        )}
      </div>
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-100 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MsgContainer;