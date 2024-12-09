import { Schema, model } from 'mongoose';
import User from './user.model.js';

const projectSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            default: 'Untitled Project',
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
            }
        ],
        resources: [
            {
                type: String,
                trim: true,
            }
        ],
        status: {
            type: String,
            enum: ['active', 'inactive', 'completed'],
            default: 'active',
        },
        activities: [
            {
                type: String,
                trim: true,
            }
        ],
        tickets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Ticket',
            }
        ],
        collaborators: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    { timestamps: true }
);

projectSchema.pre('save', async function (next) {
    if (this.isNew && !this.name) {
        const owner = await User.findById(this.owner);
        if (!owner) {
            const err = new Error('Owner not found');
            return next(err);
        }
        const projCount = owner.projects.length;
        this.name = `Project ${projCount + 1}`;
    }
    next();
});

const Project = model('Project', projectSchema);
export default Project;