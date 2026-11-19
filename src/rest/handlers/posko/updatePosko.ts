import { AppDataSource } from "@/data-source";
import { Posko } from "@/entities/Posko";
import { createErrorResponse } from "@/utils/error";
import { isValidJSON } from "@/utils/validJson";
import { Request, Response } from "express";
import Joi from "joi";
import _, { isEmpty, map } from "lodash";

const updatePoskoRequest = Joi.object({
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

export const updatePoskoHandler = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];


    const { error, value } = updatePoskoRequest.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(createErrorResponse(error.details.map((err) => err.message)));
    }

    const repository = AppDataSource.getRepository(Posko);
    const posko = await repository.findOne({
      where: { id: parseInt(req.params.id) },
    });

    if (!posko) {
      return res.status(404).json(createErrorResponse("Posko not found", 404));
    }

    console.log(files, "-----files-----");

    if (!isEmpty(files)) {

      if (await isValidJSON(posko?.lampiran)) {
        const oldDataLampiran = JSON.parse(posko?.lampiran);
        const newDataLampiran = map(files, ({ size, originalname, mimetype, filename, destination, }) => {

          console.log(originalname, "-----originalname-----");

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
        const updatedLampiran = [
          ...oldDataLampiran.filter((of: any) =>
            newDataLampiran.some(nf => nf.originalname === of.originalname)
          ),
          ...newDataLampiran.filter(
            nf => !oldDataLampiran.some((of: any) => of.originalname === nf.originalname)
          ),
        ];
        value.lampiran = JSON.stringify(updatedLampiran);
      } else {
        const oldDataLampiran = [
          {
            filename: "",
            originalname: "",
            size: "",
            mimetype: "",
            destination: "",
            fileURL: `${value.lampiran}`,
          }
        ];
        const newDataLampiran = map(files, ({ size, originalname, mimetype, filename, destination, }) => {
          return {
            filename,
            originalname,
            size,
            mimetype,
            destination,
            fileURL: `${req.protocol}://${req.get("host")}/v1/mob/api/uploads/${filename}`,
          };
        });
        const updatedLampiran = [
          ...(isEmpty(value.lampiran) ? [] : oldDataLampiran),
          ...newDataLampiran.filter(
            nf => !oldDataLampiran.some((of: any) => of.originalname === nf.originalname)
          ),
        ];
        value.lampiran = JSON.stringify(updatedLampiran);
      }

    } else {
      if (isEmpty(value.lampiran)) {
        value.lampiran = JSON.stringify([]);
      } else {
        value.lampiran = JSON.stringify(value.lampiran);
      }
    }

    repository.merge(posko, value);
    const result = await repository.save(posko);

    console.log(result, '-----result-----');


    return res.status(200).json({ success: true, data: { ...posko, lampiran: JSON.parse(result.lampiran || "[]") } });
  } catch (err) {
    console.error("Error updating posko:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to update posko", 500));
  }
};
