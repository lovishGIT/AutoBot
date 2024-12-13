import { Schema, model } from 'mongoose';
import User from './user.model.js';

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        description: {
            type: String,
            trim: true,
            default: 'No description provided',
        },
        link: [
            {
                type: String,
                trim: true,
            },
        ],
        resources: [
            {
                url: {
                    type: String,
                    trim: true,
                },
                public_id: {
                    type: String,
                    trim: true,
                },
                text: {
                    type: String,
                    trim: true,
                },
                _id: false,
            },
        ],
        status: {
            type: String,
            lowercase: true,
            trim: true,
            enum: ['active', 'inactive', 'completed'],
            default: 'active',
        },
        tickets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Ticket',
            },
        ],
        collaborators: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    { timestamps: true }
);

projectSchema.pre('save', async function (next) {
    if (this.isNew && !this.name) {
        this.name = `Untitled Project ${this._id}`;
    }
    next();
});

const Project = model('Project', projectSchema);
export default Project;