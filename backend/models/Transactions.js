
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
});

const transactionModel = mongoose.model("Transactions", transactionSchema);

export default transactionModel;