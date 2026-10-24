import { matchedData } from "express-validator";
import { ProfileModel } from "../models/Profile.js";

export const getAllProfiles = async(req,res)=>{
    try {
        const allprofiles = await ProfileModel.find({isActive: true}).populate("user");
        return res.status(200).json({data: allprofiles})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "lo sentimos ocurrio un error interno"})
    }
}

export const getProfilesbyId = async(req,res)=>{
    try {
        const {id} = matchedData(req);
        const profile = await ProfileModel.findOne({ _id: id, isActive: true }).populate("user");
        return res.status(200).json({data:profile})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "lo sentimos ocurrio un error interno"})
    }
}

export const createProfile = async(req,res)=>{
    try {
        const data = matchedData(req);
        const newProfile = await ProfileModel.create(data);
        return res.status(201).json({msg: "el perfil fue creado correctamente",data: newProfile})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "lo sentimos ocurrio un error interno"})
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const {id, ...data} = matchedData(req);
        const profileUpdated = await ProfileModel.findByIdAndUpdate(
            {_id: id, isActive:true},
            data,
            {new:true, runValidators:true}
        );
        return res.status(200).json({msg: "se actualizo el perfil correctamente", data: profileUpdated})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "lo sentimos ocurrio un error interno"})
    }
}

export const deleteProfile = async(req,res)=>{
    try {
        const {id} = matchedData(req);
        const profileDeleted = await ProfileModel.findByIdAndUpdate(id, {isActive:false}, {new:true})
        return res.status(200).json({msg: "se eleimino el perfil correctamente", data:profileDeleted})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "lo sentimos ocurrio un error interno"})
    }
}