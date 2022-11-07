import mongoose from "mongoose";

// interface describes that user
// stored in db
interface UserAttrs {
    email: string,
    password: string
}

// interface describes that functions
// we can use as method of User
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

// interface decribes that user model
// document
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export { User }
