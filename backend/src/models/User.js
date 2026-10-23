import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
    roles: [{
        type: Types.ObjectId,
        required: true,
        ref: "Role"
    }],
    favorites:[{
      type: Types.ObjectId,
      ref: "Product"
    }],
  },
  {
    versionKey: false,
  },
);

export const UserModel = model("User", userSchema);
