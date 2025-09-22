import mongoose from "mongoose";
import type { Model, InferSchemaType } from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 8},
    gender: {type: String, required: true, enum: ["male", "female"]},
    createdAt: {type: Date, default: Date.now},
}, {timestamps: true, })


type UserDocument = InferSchemaType<typeof UserSchema>;

const UserModel: Model<UserDocument> = (models.User as Model<UserDocument>) ?? model<UserDocument>("User", UserSchema);

export default UserModel;
