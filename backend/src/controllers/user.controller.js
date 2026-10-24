import { matchedData } from "express-validator";
import { UserModel } from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate("roles").populate("favorites");//para que haga bien la referencia del otro documento se usa el nombre de la propiedad en donde esta la referencia
    return res.status(200).json({data: users});
  } catch (error) {
    return res.status(500).json({ msg: "lo sentimo osucrrio un error interno" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const userExist = await UserModel.findById(id).populate("roles").populate("favorites");
    return res.status(200).json({data: userExist});
  } catch (error) {
    return res.status(500).json({ msg: "lo sentimo osucrrio un error interno" });
  }
};

export const createUsers = async (req, res) => {
  try {
    const data = matchedData(req)
    const userCreated = await UserModel.create(data);
    return res.status(201).json({msg: "se creo el user correctamente",data: userCreated})
  } catch (error) {
    return res.status(500).json({ msg: "lo sentimo osucrrio un error interno" });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const {id,...data} = matchedData(req);
    const userUpdated = await UserModel.findByIdAndUpdate(id, data, { new: true }); //nota este actualiza y muestra lo que actualizo con new:true
    return res.status(200).json({msg: "usuario actualizado correctamente", data: userUpdated})
  } catch (error) {
    return res.status(500).json({ msg: "lo sentimo osucrrio un error interno" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const userDeleted = await UserModel.findByIdAndDelete(id);
    return res.status(200).json({data: userDeleted})
  } catch (error) {
    return res.status(500).json({ msg: "lo sentimo osucrrio un error interno" });
  }
};
