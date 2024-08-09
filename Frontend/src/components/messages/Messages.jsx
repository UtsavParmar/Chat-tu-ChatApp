import React, { useRef, useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import { useAuthContext } from "../../context/AuthContext";
import { useSelectedContext } from "../../context/SelectedContext";
import { useSocketContext } from "../../context/SocketContext";
import { useMessagesContext } from "../../context/MessagesContext";

const Messages = ({ onDeleteMessage }) => {
  const { loading, messages } = useGetMessages();
  const { authUser } = useAuthContext();
  const { selectedConversation } = useSelectedContext();
  const { setMessages } = useMessagesContext();
  const { socket } = useSocketContext();

  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    const lastMessageIsFromOtherUser =
      messages.length && messages[messages.length - 1].senderId !== authUser._id;

    if (lastMessageIsFromOtherUser) {
      socket?.emit("markMessagesAsSeen", {
        selectedUser: selectedConversation._id,
      });
    }

    socket?.on("messagesSeen", ({ userId }) => {
      if (selectedConversation._id === userId) {
        setMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message.seen) {
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });
          return updatedMessages;
        });
      }
    });

    socket?.on("messageDeleted", ({ messageId, conversationId }) => {
      if (conversationId === selectedConversation._id) {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
      }
    });

    return () => {
      socket?.off("messagesSeen");
      socket?.off("messageDeleted");
    };
  }, [socket, authUser._id, messages, selectedConversation, setMessages]);

  // Handle message deletion
  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
    onDeleteMessage(messageId); // Notify parent component about the deletion
  };

  return (
    <div className="px-4 h-full flex-1 flex flex-col overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} onDelete={handleDeleteMessage} />
          </div>
        ))}
      {loading ? (
        <div className="m-auto flex gap-1">
          <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 bg-green-400 rounded-full animate-bounce"></div>
        </div>
      ) : (
        ""
      )}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;

