import { AppDataSource } from "@/data-source";
import { Request, Response } from "express";
import { createErrorResponse } from "@/utils/error";
import { MstPesertaPosko } from "@/entities/MstPesertaPosko";
import { toCamelCase } from "@/utils/convert";

export const getPoskoParticipantHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const repository = AppDataSource.getRepository(MstPesertaPosko);

    const data = await repository.find();

    return res.status(200).json({
      success: true,
      data: toCamelCase(data),
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to fetch data", 500));
  }
};
