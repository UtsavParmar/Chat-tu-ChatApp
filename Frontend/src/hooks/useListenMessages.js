import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import { useMessagesContext } from "../context/MessagesContext";
import { useSelectedContext } from "../context/SelectedContext";
import pop_sound from "../assets/sounds/pop-sound.mp3"

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useMessagesContext();
	const { selectedConversation } =useSelectedContext();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			if(newMessage.senderId=== selectedConversation._id){

				const sound=new Audio(pop_sound)
				sound.play()
				setMessages([...messages, newMessage]);
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;