import e from "express";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    }
    ,
    isVerifyNumber: {
        type: Boolean,
        default: false,
    },
    isVerifyEmail: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "guest",
    },
    address: {
        type: String,
        default: "",
    },
    bios: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEgq7TlTgmYDxWrJZbRNZsnf6JgXn9fQB5uw&s",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    social: {
        facebook: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        youtube: {
            type: String,
            default: "",
        },

    },
},
    {
        versionKey: false, timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
export default User;