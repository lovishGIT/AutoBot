import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        assignedDeveloper: [{
            type: String,
        }],
        status: {
            type: String,
            enum: ['open', 'in-progress', 'completed'],
            default: 'open',
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Playground',
            required: true,
        },
    },
    { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;