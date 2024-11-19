import mongoose from 'mongoose';

const developerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String, // url
            required: false,
        },
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        }],
    },
    { timestamps: true }
);

const Developer =  mongoose.model('Developer', developerSchema);
export default Developer;