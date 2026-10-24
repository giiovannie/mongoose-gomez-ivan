
import { matchedData } from "express-validator";
import { productModel } from "../models/Product.js";
import { UserModel } from "../models/User.js";

//nota para mi: algunos productos pueden estar inactivos que significa que pueden estar borrados , para ello trabajamos solo en los productos que solo estab activos 

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({ isActive: true }).populate("categories");
    return res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const product = await productModel.findOne({ _id: id, isActive: true }).populate("categories");
    return res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const data = matchedData(req);
    const productCreated = await productModel.create(data);
    return res.status(201).json({msg: "el producto fue creado correctamente",data: productCreated,});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);
    const productUpdated = await productModel.findOneAndUpdate(
      { _id: id, isActive: true }, //busca por el id y que este activo el producto que se quiere actualizar
      data,
      { new: true, runValidators: true },
    );
    return res.status(200).json({msg: "el producto fue actualizado correctamente",data: productUpdated});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = matchedData(req);
    //eliminicion logica , el producto queda inactivo en lugar de ser borrado
    const productDeleted = await productModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    //si el producto se queda inactivo busca masivamente ese id para quitarlo
    await UserModel.updateMany(
      { favorites: id },
      { $pull: { favorites: id } },
    );

    return res.status(200).json({msg: "el producto fue eliminado correctamente",data: productDeleted});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

// notas:
// express-validator: valida los datos que llegan en la petición, antes de ejecutar el controlador

// runValidators: true: aplica las validaciones del esquema de Mongoose durante la actualización.