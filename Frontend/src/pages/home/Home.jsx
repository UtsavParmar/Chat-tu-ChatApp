import React from "react";
import SideBar from "../../components/sidebar/SideBar";

import MsgContainer from "../../components/messages/MsgContainer";
const Home = () => {
  return (
    <div className="grid grid-cols-3 px-6 ">
      <SideBar></SideBar>
      <MsgContainer></MsgContainer>
      
    </div>
  );
};

export default Home;
