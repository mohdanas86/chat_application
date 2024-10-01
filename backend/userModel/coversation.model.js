import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants: [ // Fixed typo from participantes to participants
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [ // Fixed field name from message to messages
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message', // Consistent model naming
            default: []
        }
    ]
}, { timestamps: true });

const ConversationModel = mongoose.model('Conversation', conversationSchema); // Consistent model naming

export default ConversationModel;
