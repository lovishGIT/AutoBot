import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import emailValidator from 'email-validator';

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required.'],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            trim: true,
            unique: true,
            index: true,
            validate: {
                validator: emailValidator.validate,
                message: 'Invalid email format',
            },
        },
        avatar: {
            type: {
                url: {
                    type: String,
                    required: true,
                    trim: true,
                },
                public_id: {
                    type: String,
                    required: false,
                    trim: true,
                },
            },
            required: false,
            _id: false
        },
        role: {
            type: String,
            lowercase: true,
            trim: true,
            enum: ['user', 'admin', 'super-admin'],
            default: 'user',
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
    if (this.isModified('role')) {
        console.log('Role is modified');
    }
    next();
});

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
    delete userObject.__v;
    return userObject;
};

const User = model('User', userSchema);
export default User;