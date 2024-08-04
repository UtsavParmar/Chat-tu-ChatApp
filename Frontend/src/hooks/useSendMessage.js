import React, { useEffect, useState } from "react";
import { useMessagesContext } from "../context/MessagesContext";
import { useSelectedContext } from "../context/SelectedContext";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useMessagesContext();
  const { selectedConversation } = useSelectedContext();

  
    const sendMessage = async (message) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/send/${selectedConversation._id}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({message})
      });
      
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        // console.log(messages,"messages before");
        setMessages([...messages,data]);
        // console.log(messages,"messages after");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    
  

  return { loading, sendMessage };
};

export default useSendMessage;
