// controllers/app-config.controller.ts
import { Request, Response, NextFunction } from "express";
import {
  createAppConfig,
  updateAppConfig,
  deleteAppConfig,
  listAppConfigsByPlatform,
  findAppConfigById,
  getAppConfigValue,
} from "../services/app.setting.service";

export async function createAppConfigController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.body;
    const data = await createAppConfig(payload);

    return res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
}

export async function updateAppConfigController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const payload = req.body;

    const data = await updateAppConfig(id, payload);
    return res.json({ data });
  } catch (err) {
    next(err);
  }
}

export async function getAppConfigByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const data = await findAppConfigById(id);

    return res.json({ data });
  } catch (err) {
    next(err);
  }
}

export async function listAppConfigsByPlatformController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { platform } = req.query;

    if (!platform || typeof platform !== "string") {
      return res.status(400).json({
        message: "platform is required",
      });
    }

    const data = await listAppConfigsByPlatform(platform);
    return res.json({ data });
  } catch (err) {
    next(err);
  }
}

export async function getAppConfigValueController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { platform, key, compare } = req.query;

    if (
      !platform ||
      !key ||
      typeof platform !== "string" ||
      typeof key !== "string"
    ) {
      return res.status(400).json({
        message: "platform and key are required",
      });
    }

    const value = await getAppConfigValue(platform, key);
    if (value === null || value === undefined) {
      return res.status(404).json({
        value: null,
        isMatch: false,
      });
    }

    if (compare === undefined) {
      return res.json({ value });
    }

    let isMatch = false;

    if (typeof value === "object") {
      isMatch = JSON.stringify(value) === String(compare);
    } else {
      isMatch = String(value) === String(compare);
    }

    return res.json({
      value,
      isMatch,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteAppConfigController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    await deleteAppConfig(id);
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
