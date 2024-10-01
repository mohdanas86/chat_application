import express from 'express';
import protectRouter from '../middleware/protect.router.js';
import ConversationModel from '../userModel/coversation.model.js'; // Corrected import path
import MessageModel from '../userModel/message.model.js'; // Corrected import path

const messageRouter = express.Router();

messageRouter.post('/send/:id', protectRouter, postMessage);
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

        // Find or create a conversation
        let conversation = await ConversationModel.findOne({
            participants: {
                "$all": [senderId, receiverId]
            }
        });

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

        // Update the conversation with the new message ID
        conversation.messages.push(newMessage._id);
        await conversation.save();

        res.status(200).json({
            message: 'Message sent successfully',
            data: newMessage
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message || 'An error occurred'
        });
    }
}

// async function getMessage(req, res) {
//     try {
//         const userChatId = req.params.id;
//         const senderId = req.user._id;

//         console.log(userChatId)
//         console.log(senderId)
//         const converstion = await ConversationModel.findOne({
//             participants: { "$all": [senderId, userChatId] }
//         }).populate("messages")

//         if (converstion) {
//             res.status(200).json({
//                 message: "No Conversation",
//             })
//         } else {
//             res.status(200).json({
//                 message: "data",
//                 converstion: converstion.messages
//             })
//         }

//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             message: "get user message error",
//             error: err.message || 'An error occurred'
//         });
//     }
// }
async function getMessage(req, res) {
    try {
        const userChatId = req.params.id;
        const senderId = req.user._id;

        console.log(userChatId);
        console.log(senderId);

        const conversation = await ConversationModel.findOne({
            participants: { "$all": [senderId, userChatId] }
        }).populate("messages");

        // if (conversation) { // Check if the conversation does not exist
        //     return res.status(404).json({
        //         message: "No Conversation found",
        //     });
        // } 
        
        return res.status(200).json({
            message: "Conversation retrieved successfully",
            conversation: conversation.messages // Return messages here
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while retrieving the conversation",
        });
    }
}


export default messageRouter;
