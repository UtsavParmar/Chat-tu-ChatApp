import React, { createContext, useContext, useState } from "react";

export const SelectedContext = createContext();

export const useSelectedContext = () => {
  return useContext(SelectedContext);
};
export const SelectedContextProvider = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  return (
    <SelectedContext.Provider
      value={{ selectedConversation, setSelectedConversation }}
    >
      {children}
    </SelectedContext.Provider>
  );
};
