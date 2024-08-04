const express = require("express");
const path = require('path');
const { app, server } = require("./socket/socket.js");
const connectMongo=require("./db/connectMongo.js")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const __dirname1=path.resolve();
// console.log(__dirname);
const authRoutes = require("./routes/authroute.js");
const messageRoutes = require("./routes/messageroutes.js");
const usersRoutes = require("./routes/usersroutes.js");

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",usersRoutes);

app.use(express.static(path.join(__dirname1, "/Frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname1, "Frontend", "dist", "index.html"));
});


server.listen(PORT, () => {
    connectMongo()
  console.log(`server running at port ${PORT}`);
});
