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
            required: true,
            minlength: 3,
        },
        description: {
            type: String,
        },
        collaborators: [{
            type: Schema.Types.ObjectId,
        }],
        status: {
            type: String,
            enum: ['open', 'in-progress', 'completed'],
            default: 'open',
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        progress: {
            type: Number,
            default: 0,
            max: 100,
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
// const sampleTickets = {
//         title: 'Fix login bug',
//         description: 'Users are unable to login with correct credentials.',
//         collaborators: [],
//         status: 'open',
//         priority: 'high',
//         progress: 0,
//         projectId: '60d21b4667d0d8992e610c85',
//         comments: [
//             {
//                 text: 'This issue needs to be resolved ASAP.',
//                 author: '60d21b4667d0d8992e610c86',
//                 tag: ['pinned']
//             },
//             {
//                 text: 'I am working on this.',
//                 author: '60d21b4667d0d8992e610c87',
//                 tag: ['admin']
//             }
//         ],
//         dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
//     }