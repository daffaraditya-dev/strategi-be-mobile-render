import { AppDataSource } from "@/data-source";
import { Posko } from "@/entities/Posko";
import { createErrorResponse } from "@/utils/error";
import { Request, Response } from "express";
import Joi from "joi";
import { isEmpty, map } from "lodash";

const createPoskoRequest = Joi.object({
  namaPosko: Joi.string().required(),
  idJenisPosko: Joi.number().integer().required(),
  idEvent: Joi.number().required(),
  alamatPosko: Joi.string().allow(null, ""),
  unitKerjaKoordinator: Joi.string().allow(null, ""),
  idPesertaPosko: Joi.number().integer().allow(null),
  koordinatorPosko: Joi.string().allow(null, ""),
  lokasiPosko: Joi.string().allow(null, ""),
  koordinatPosko: Joi.string().allow(null, ""),
  ketuaPosko: Joi.string().allow(null, ""),
  noTelpKetuaPosko: Joi.string().allow(null, ""),
  picPosko: Joi.string().allow(null, ""),
  noTelpPosko: Joi.string().allow(null, ""),
  masaPantauAwal: Joi.date().allow(null),
  masaPantauAkhir: Joi.date().allow(null),
  titikPantau: Joi.string().allow(null, ""),
  fokusPantau: Joi.array().items(Joi.string()).allow(null),
  lampiran: Joi.any().allow(null),

});

export const createPoskoHandler = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    const { error, value } = createPoskoRequest.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    const repository = AppDataSource.getRepository(Posko);

    if (!isEmpty(files)) {

      const tmpLampiran = map(files, ({ size, originalname, mimetype, filename, destination, }) => {
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
      value.lampiran = JSON.stringify(tmpLampiran);
    } else {

      if (isEmpty(value.lampiran)) {
        value.lampiran = JSON.stringify([]);
      } else {
        value.lampiran = JSON.stringify(value.lampiran);
      }
    }

    const posko = repository.create([value]);

    const poskoRes = await repository.save(posko);
    // const decodedString = JSON.stringify(poskoRes, null, 2);
    // const decodedData = JSON.parse(decodedString);

    return res.status(201).json({
      success: true, data: map(poskoRes, ({ lampiran }) => {
        return { ...posko, lampiran: JSON.parse(lampiran || "[]") };
      })
    });
  } catch (err) {
    console.error("Error creating posko:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to create posko", 500));
  }
};
