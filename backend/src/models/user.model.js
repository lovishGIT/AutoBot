import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import emailValidator from 'email-validator';

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: {
                validator: emailValidator.validate,
                message: 'Invalid email format',
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
        },
        projects: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Project',
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword
) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.passwordConfirm;
    return userObject;
};

const User = model('User', userSchema);
export default User;

/*
{
    _id: '123456789',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    password: 'securePassword123',
    projects: ['683198189183013'], // projectId
}
*/