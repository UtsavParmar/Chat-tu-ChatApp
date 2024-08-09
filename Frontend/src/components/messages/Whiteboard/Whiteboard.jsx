// import React, { useRef, useEffect, useState } from "react";
// import CanvasDraw from "react-canvas-draw"      
// import { useSocketContext } from "../../../context/SocketContext";
// import { useSelectedContext } from "../../../context/SelectedContext";


// const Whiteboard = ({ isVisible }) => {
//   const { socket } = useSocketContext();
//   const { selectedConversation } = useSelectedContext();
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);

//   useEffect(() => {
//     if (!socket || !selectedConversation) return;

//     const handleDrawing = (data) => {
        
        
//       if (canvasRef.current && data.conversationId === selectedConversation._id) {
//         canvasRef.current.loadSaveData(data.canvasData, false);
//       }
//     };

//     socket.on("drawing", handleDrawing);

//     return () => {
//       socket.off("drawing", handleDrawing);
//     };
//   }, [socket, selectedConversation]);

//   const handleChange = () => {
      
      
//       const data = {
//           conversationId: selectedConversation?._id,
//           canvasData: canvasRef.current.getSaveData(),
//         };
//         socket?.emit("drawing", data);
      
//         console.log("emitting..");
    
//   };

//   return isVisible ? (
//     <CanvasDraw
//       ref={canvasRef}
//       onChange={handleChange}
//       brushRadius={2}
//       lazyRadius={0}
//       canvasWidth={600}
//       canvasHeight={400}
//       hideInterface
//       loadTimeOffset={0}
//       onPointerDown={() => setIsDrawing(true)}
//       onPointerUp={() => setIsDrawing(false)}
//     />
//   ) : null;
// };

// export default Whiteboard;
