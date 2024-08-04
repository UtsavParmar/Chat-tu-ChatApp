import React, { useState,useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";
import { useSelectedContext } from "../../context/SelectedContext";
const MessageInput = () => {
  const [sendmsg,setSendMsg]=useState("")
  const {socket}=useSocketContext()
  const {selectedConversation}= useSelectedContext()
  const {loading,sendMessage}=useSendMessage()

  // typing...
  let typingTimeout;

  const handleTyping = () => {
    socket?.emit("typing", { recipientId: selectedConversation._id });
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket?.emit("stopTyping", { recipientId: selectedConversation._id });
    }, 3000);
  };

  const handleSubmit = async (e) => {
		e.preventDefault();
		if (!sendmsg) return;
		await sendMessage(sendmsg);
		setSendMsg(""); 
    socket?.emit("stopTyping", { recipientId: selectedConversation._id });
	};

  
  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);
  
  return (
    <form className=" p-2 flex gap-3" onSubmit={handleSubmit}>
      <div className="shadow1">
        <input type="text" placeholder="Search" value={sendmsg} onChange={(e)=>{
          setSendMsg(e.target.value)
          handleTyping();
        }} />
      </div>
      <button className="circle text-center" type="submit" disabled={loading}>
        <IoMdSend className="mx-auto text-xl" />
      </button>
    </form>
  );
};

export default MessageInput;
