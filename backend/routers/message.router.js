import express from 'express';
import protectRouter from '../middleware/protect.router.js';
import ConversationModel from '../userModel/coversation.model.js'; // Corrected import path
import MessageModel from '../userModel/message.model.js'; // Corrected import path

const messageRouter = express.Router();

// POST message
messageRouter.post('/send/:id', protectRouter, postMessage);

// GET messages
messageRouter.get('/:id', protectRouter, getMessage);

async function postMessage(req, res) {
    try {
        const { message } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id.toString();

        // Ensure senderId and receiverId are different
        if (senderId === receiverId) {
            return res.status(400).json({
                error: 'Sender and receiver IDs must be different.'
            });
        }

        // Find or create a conversation between sender and receiver
        let conversation = await ConversationModel.findOne({
            participants: {
                "$all": [senderId, receiverId]
            }
        });

        // If conversation doesn't exist, create it
        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        // Create a new message
        const newMessage = new MessageModel({
            senderId,
            receiverId,
            message
        });

        // Save the new message
        await newMessage.save();

        // Update the conversation with the new message
        conversation.messages.push(newMessage._id);
        await conversation.save();

        res.status(200).json({
            message: 'Message sent successfully',
            data: newMessage
        });

    } catch (err) {
        console.error("Error in postMessage:", err);
        return res.status(500).json({
            error: err.message || 'An error occurred while sending the message'
        });
    }
}

async function getMessage(req, res) {
    try {
        const userChatId = req.params.id;
        const senderId = req.user._id;

        console.log("userChatId:", userChatId);
        console.log("senderId:", senderId);

        // Find the conversation between the sender and receiver
        const conversation = await ConversationModel.findOne({
            participants: { "$all": [senderId, userChatId] }
        }).populate("messages");

        // If no conversation is found, return a 404 error
        if (!conversation) {
            return res.status(404).json({
                message: "No conversation found between the users."
            });
        }

        // Return the messages from the conversation
        return res.status(200).json({
            message: "Conversation retrieved successfully",
            conversation: conversation.messages // Return the messages array
        });

    } catch (err) {
        console.error("Error in getMessage:", err);
        return res.status(500).json({
            message: "An error occurred while retrieving the conversation",
            error: err.message || 'An error occurred'
        });
    }
}

export default messageRouter;
