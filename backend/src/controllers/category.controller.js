import { matchedData } from "express-validator";
import { categoryModel } from "../models/Category.js";
import { productModel } from "../models/Product.js";


export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ isActive: true });
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const category = await categoryModel.findOne({ _id: id, isActive: true });
    return res.status(200).json({ data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const data = matchedData(req);
    const categoryCreated = await categoryModel.create(data);
    return res.status(201).json({msg: "la categoría fue creada correctamente",data: categoryCreated});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);
    const categoryUpdated = await categoryModel.findOneAndUpdate(
      { _id: id, isActive: true },
      data,
      { new: true, runValidators: true },
    );
    return res.status(200).json({msg: "la categoría fue actualizada correctamente",data: categoryUpdated});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const categoryDeleted = await categoryModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    await productModel.updateMany(
        { categories: id },
        { $pull: { categories: id } }
    );
    return res.status(200).json({msg: "la categoría fue eliminada correctamente",data: categoryDeleted});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};