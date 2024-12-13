import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        text: {
            type: [String, 'Comment text is required'],
            required: true,
            trim: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tag: [{
            type: String,
            enum: ['pinned', 'admin', 'edited'],
        }],
    }, {
        timestamps: true,
    }
);

const ticketSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Ticket title is required'],
            minlength: 3,
        },
        description: {
            type: String,
        },
        collaborators: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        status: {
            type: String,
            enum: ['open', 'in-progress', 'completed'],
            default: 'open',
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'low',
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        comments: [commentSchema],
        dueDate: {
            type: Date,
            default: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days from now
        },
    },
    { timestamps: true }
);

const Ticket = model('Ticket', ticketSchema);
export default Ticket;