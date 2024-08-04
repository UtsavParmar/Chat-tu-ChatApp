import React, { useState } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetCoversations";
const Conversations = () => {
  const {loading,conversations}=useGetConversations()
  
  return (
    <div className="upshadow1 p-2 overflow-auto">
      {conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					lastIdx={idx=== conversations.length-1}
          
				/>
			))}
      {loading ? <div className={`py-2 flex gap-1 justify-center items-center cursor-pointer`} type="submit" disabled={loading}>
           
            <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce"></div>
           
          </div> : null}
    </div>
  );
};

export default Conversations;
