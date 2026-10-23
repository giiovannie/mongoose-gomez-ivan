import { model, Schema, Types } from "mongoose";

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    addresses: [
      {
        _id: false,
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  },
);

export const ProfileModel = model("Profile", profileSchema);
