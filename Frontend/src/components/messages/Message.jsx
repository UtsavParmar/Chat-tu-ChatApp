import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSelectedContext } from "../../context/SelectedContext";
import { extractTime } from "../../../utils/extractTime";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const {selectedConversation}=useSelectedContext()
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  return (
    <>
      {!fromMe ? (
        <div className="chat-message py-2">
          <div className="flex items-end">
            <img
              src={selectedConversation.profimg}
              alt="My profile"
              className="w-6 h-6 rounded-full "
            />
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-start">
              <div className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#242424] text-gray-100">
                <span >
                  {message.message} 
                </span>
                
              </div>
                <p className="text-right text-[0.65rem] text-grey-dark flex">{formattedTime} </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-message py-2 ">
          <div className="flex items-end justify-end">
            <img
              src={authUser.prof_pic}
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 items-end">
              <div className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-100 text-[#242424] ">
                <span className="font-semibold" >
                  {message.message}
                </span>
                <IoCheckmarkDoneSharp className={` ml-3 inline-block ${message.seen?"text-green-500":""} text-base font-extrabold`} />
              </div>
                <p className="text-right text-[0.65rem] text-grey-dark mt-1">{formattedTime}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
