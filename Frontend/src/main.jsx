import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SelectedContextProvider } from "./context/SelectedContext.jsx";
import { MessagesContextProvider } from "./context/MessagesContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SelectedContextProvider>
          <MessagesContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </MessagesContextProvider>
        </SelectedContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
