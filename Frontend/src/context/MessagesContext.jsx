import React, { createContext, useContext, useState } from 'react'

export const MessagesContext=createContext()
export const useMessagesContext=()=>{
    return useContext(MessagesContext)
}
export const MessagesContextProvider = ({children}) => {
    const [messages,setMessages]=useState("")
  return (
    <MessagesContext.Provider value={{messages,setMessages}}>
        {children}
    </MessagesContext.Provider>
  )
}

