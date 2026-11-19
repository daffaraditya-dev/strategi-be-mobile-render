import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";
import { isEmpty, map } from "lodash";

const storageRequest = Joi.object({
  file: Joi.any().allow(null),

});

export const uploadFiles = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    const { error, value } = storageRequest.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    if (!isEmpty(files)) {

      const tmpFiles = map(files, ({ size, originalname, mimetype, filename, destination, }) => {
        return {
          filename,
          originalname,
          size,
          mimetype,
          destination,
          fileURL: `${req.protocol}://${req.get("host")}/v1/mob/api/uploads/${filename
            }`,
        };
      });
      value.files = tmpFiles;
    } else {
      value.files = [];
    }

    return res.status(201).json({
      success: true, data: value?.files ?? []
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to upload file", 500));
  }
};
