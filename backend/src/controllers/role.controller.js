import { matchedData } from "express-validator";
import { RoleModel } from "../models/Role.js";
import { UserModel } from "../models/User.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find();
    return res.status(200).json({ data: roles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const role = await RoleModel.findById(id);
    return res.status(200).json({ data: role });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const createRole = async (req, res) => {
  try {
    const data = matchedData(req);
    const roleCreated = await RoleModel.create(data);
    return res.status(201).json({msg: "el rol fue creado correctamente",data: roleCreated});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);
    const roleUpdated = await RoleModel.findByIdAndUpdate(id,data,{ new: true, runValidators: true });
    return res.status(200).json({msg: "el rol fue actualizado correctamente",data: roleUpdated});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const roleDeleted = await RoleModel.findByIdAndUpdate(
      id,
      {}
    );
    return res.status(200).json({msg: "el rol fue eliminado correctamente",data: roleDeleted});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "lo sentimos ocurrio un error interno" });
  }
};
