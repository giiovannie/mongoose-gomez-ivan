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
    isActive:{
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    versionKey: false,
    // nota: permiten que los campos virtuales se incluyan cuando el documento se convierte a JSON o a un objeto normal.
    toJSON:{virtuals: true},
    toObject: {virtuals: true}
  },
);

userSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "user",
  justOne: true
});

export const UserModel = model("User", userSchema);
