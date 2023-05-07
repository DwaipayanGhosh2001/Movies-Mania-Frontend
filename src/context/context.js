import { createContext, useContext, useState, useEffect } from "react";
const channelContext = createContext();

export function useChannelRecord() {
  return useContext(channelContext);
}

export function ChannelContextProvider({ children }) {
  const [channelDetails, setChannelDetails] = useState([]);

  
  const value = {  channelDetails , setChannelDetails };
  return (
    <channelContext.Provider value={value}>{children}</channelContext.Provider>
  );
}
