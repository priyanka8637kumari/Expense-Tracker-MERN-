import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transactions'
        }
        // {
        //     text: {
        //         type: String,
        //         required: true,
        //     },
        //     amount: {
        //         type: Number,
        //         required: true,
        //     },
        //     createdOn: {
        //         type: Date,
        //         default: Date.now,
        //     }
        // }
    ]
    });

const userModel = mongoose.model('Users', userSchema);

export default userModel;