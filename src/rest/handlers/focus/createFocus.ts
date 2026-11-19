import { AppDataSource } from "@/data-source";
import { Fokus } from "@/entities/Fokus";
import { toCamelCase } from "@/utils/convert";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";

// Schema for validating focus creation request
const createFocusRequest = Joi.object({
  judul: Joi.string().required(),
  isDefault: Joi.bool(),
  simpulTransportasi: Joi.array()
    .items(
      Joi.object({
        matra: Joi.string(),
        moda: Joi.string(),
        simpul: Joi.string().required(),
      })
    )
    .required(),
  cctv: Joi.array()
    .items(
      Joi.object({
        matra: Joi.string(),
        simpul: Joi.string().required(),
        titikCctv: Joi.string().required(),
      })
    )
    .required(),
  video30s: Joi.array()
    .items(
      Joi.object({
        judul: Joi.string().required(),
        deskripsi: Joi.string().optional(),
        link: Joi.string().required(),
        uptId: Joi.string().required(),
        uptName: Joi.string().required(),
        channel: Joi.string().allow("").optional(),
        liveStreamId: Joi.string().optional(),
        namaMatra: Joi.string().optional(),
        publishedAt: Joi.string().allow(null).optional(),
        streamingSchedule: Joi.string().allow(null).optional(),
      })
    )
    .required(),
  videoLiveStreaming: Joi.array()
    .items(
      Joi.object({
        judul: Joi.string().required(),
        deskripsi: Joi.string().optional(),
        link: Joi.string().required(),
        uptId: Joi.string().required(),
        uptName: Joi.string().required(),
        channel: Joi.string().required(),
        liveStreamId: Joi.string().optional(),
        namaMatra: Joi.string().optional(),
        publishedAt: Joi.string().allow(null).optional(),
        streamingSchedule: Joi.string().allow(null).optional(),
      })
    )
    .required(),
});

export const createFocusHandler = async (req: Request, res: Response) => {
  try {
    const { error, value } = createFocusRequest.validate(req.body);

    console.log(error, "=====error=====");

    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    const id_user = req.auth?.userId;

    if (!id_user) {
      return res.status(400).json(createErrorResponse("User ID is required"));
    }

    const userRepository = AppDataSource.getRepository("User");
    const user = await userRepository.findOne({
      where: { id: id_user },
      relations: ["role"],
    });

    if (!user) {
      return res.status(404).json(createErrorResponse("User not found"));
    }

    const role = user.role?.name?.toLowerCase() ?? "";

    // Check if the user is not a superadmin and isDefault is true
    if (value.isDefault && role !== "superadmin") {
      return res
        .status(403)
        .json(createErrorResponse("Unauthorized to set isDefault to true"));
    }

    const repository = AppDataSource.getRepository(Fokus);

    // Find or create new record
    let focus = await repository.findOne({
      where: value.isDefault
        ? { is_default: true }
        : { id_user: id_user },
    });

    if (!focus) {
      focus = repository.create({
        id_user: id_user,
        create_date: new Date(),
      });
    }

    // Update fields
    Object.assign(focus, {
      id_user: id_user,
      judul: value.judul,
      is_default: value.isDefault,
      simpul_transportasi: value.simpulTransportasi,
      cctv: value.cctv,
      video_30s: value.video30s,
      video_live_streaming: value.videoLiveStreaming,
      update_date: new Date(),
    });

    // Save (upsert)
    const result = await repository.save(focus);

    return res.status(200).json({
      success: true,
      data: toCamelCase(result),
      message: "Focus record upserted successfully",
    });
  } catch (err) {
    console.error("Error upserting focus record:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to upsert focus record", 500));
  }
};
