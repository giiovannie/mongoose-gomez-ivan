import { model, Schema, Types } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 60,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 366,
      minlength: 50,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    categories: [
      {
        type: Types.ObjectId,
        ref: "Category",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
  },
);

export const productModel = model("Product", productSchema);
