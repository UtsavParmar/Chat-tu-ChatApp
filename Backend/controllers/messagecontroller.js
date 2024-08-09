const Conversation = require("../models/chatModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket.js");

const sendMessage = async (req, res) => {
    try {
        const recieverId = req.params.id; // Use recieverId as per the model
        const { message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId],
            });
        }

        const newMessage = await Message.create({
            senderId,
            recieverId, // Ensure this matches the model field name
            message
        });

        if (newMessage) {
            await Conversation.updateOne(
                { _id: conversation._id },
                { $push: { messages: newMessage._id } }
            );
        }

        const recieverSocketId = getReceiverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const personId = req.params.id;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, personId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.error("Error in getMessages controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const userId = req.user._id;

        // Find the message by ID and verify it's the user's message
        const message = await Message.findOneAndDelete({ _id: messageId, senderId: userId });

        if (!message) {
            return res.status(404).json({ error: "Message not found or you don't have permission to delete it." });
        }

        // Remove the message reference from the conversation
        await Conversation.updateOne(
            { participants: { $all: [userId, message.recieverId] } }, // Changed receiverId to recieverId
            { $pull: { messages: messageId } }
        );

        // Notify clients
        io.emit("messageDeleted", { messageId, conversationId: message.conversationId });

        res.status(200).json({ message: "Message deleted successfully." });
    } catch (error) {
        console.error("Error in deleteMessage controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { sendMessage, getMessages, deleteMessage };
