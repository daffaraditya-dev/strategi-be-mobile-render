import { Request, Response } from "express";
import Joi from "joi";
import {
  getShiftList,
  getShiftDetail,
  createShift,
  updateShift,
  deleteShift
} from "./services/shift.service";

const shiftCreateSchema = Joi.object({
  name: Joi.string().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
});

const shiftUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  startTime: Joi.string().optional(),
  endTime: Joi.string().optional(),
});

const deleteSchema = Joi.object({
  id: Joi.number().required(),
});

export const getShiftListHandler = async (req: Request, res: Response) => {
  try {
    const data = await getShiftList();
    return res.json({ status: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getShiftDetailHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const data = await getShiftDetail(id);
    return res.json({ status: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const createShiftHandler = async (req: Request, res: Response) => {
  const { error, value } = shiftCreateSchema.validate(req.body);
  if (error) return res.status(400).json({ status: false, message: error.details[0].message });

  try {
    const data = await createShift(value);
    return res.status(201).json({ status: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const updateShiftHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { error, value } = shiftUpdateSchema.validate(req.body);

  if (error) return res.status(400).json({ status: false, message: error.details[0].message });

  try {
    const data = await updateShift(id, value);
    return res.json({ status: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const deleteShiftHandler = async (req: Request, res: Response) => {
  const { error, value } = deleteSchema.validate(req.query);
  if (error) return res.status(400).json({ status: false, message: error.details[0].message });

  try {
    const data = await deleteShift(Number(value.id));
    return res.json({ status: true, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};
