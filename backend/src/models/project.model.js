import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            required: true,
        },
        description: String,
    },
    { timestamps: true }
);

const Project =  mongoose.model('Project', projectSchema);
export default Project;