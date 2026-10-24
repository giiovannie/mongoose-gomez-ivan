import { model, Schema } from "mongoose";

const roleSchema = new Schema(
  {
    rolename: {
      type: String,
      required: true,
    },
    isActive:{
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RoleModel = model("Role", roleSchema);
