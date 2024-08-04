import React, { useEffect, useState } from "react";
import { useMessagesContext } from "../context/MessagesContext";
import { useSelectedContext } from "../context/SelectedContext";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useMessagesContext();
  const { selectedConversation } = useSelectedContext();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id,setMessages]);

  return { loading, messages };
};

export default useGetMessages;
