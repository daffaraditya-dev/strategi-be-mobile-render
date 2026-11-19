import { AppDataSource } from "@/data-source";
import { Request, Response } from "express";
import { createErrorResponse } from "@/utils/error";
import { Posko } from "@/entities/Posko";
import { getDataEvent } from "@/services/apiHubnet";
import { MstJenisPosko } from "@/entities/MstJenisPosko";
import { MstPesertaPosko } from "@/entities/MstPesertaPosko";
import { toCamelCase } from "@/utils/convert";
import { isValidJSON } from "@/utils/validJson";

export const getDetailPoskoHandler = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(Posko);
    const repositoryPoskoType = AppDataSource.getRepository(MstJenisPosko);
    const repositoryPesertaPosko = AppDataSource.getRepository(MstPesertaPosko);

    const poskoTypeData = await repositoryPoskoType.find();
    const pesertaPoskoData = await repositoryPesertaPosko.find();
    const eventData = await getDataEvent();

    const { id } = req.params;

    const data = await repository.findOne({
      where: { id: parseInt(id) },
    });

    if (!data) {
      return res.status(404).json(createErrorResponse("Posko not found", 404));
    }

    const responseData = {
      ...data,
      jenisPosko: toCamelCase(
        poskoTypeData.find((type) => type.id === data.idJenisPosko)
      ),
      pesertaPosko: toCamelCase(
        pesertaPoskoData.find((type) => type.id === data.idPesertaPosko)
      ),
      event: toCamelCase(
        eventData.data.find((event) => event.id === data.idEvent)
      ),
      lampiran: isValidJSON(data.lampiran) ? JSON.parse(data.lampiran) : [],
    };

    return res.status(200).json({
      success: true,
      data: responseData,
      poskoType: poskoTypeData,
      eventList: toCamelCase(eventData.data),
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to fetch data", 500));
  }
};
