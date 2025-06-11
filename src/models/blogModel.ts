import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;

};

const UserSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now}
});  

const User = mongoose.model<IUser>('User', UserSchema);
// export default User;

export interface IBlog extends Document {
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
};

const BlogSchema: Schema = new Schema<IBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
});

const Blog = mongoose.model<IBlog>('Blog', BlogSchema)
export {User, Blog};


