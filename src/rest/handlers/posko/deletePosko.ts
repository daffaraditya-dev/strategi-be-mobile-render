import { AppDataSource } from "@/data-source";
import { Request, Response } from "express";
import { createErrorResponse } from "@/utils/error";
import { Posko } from "@/entities/Posko";

export const deletePoskoHandler = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(Posko);
    const { id } = req.params;

    const data = await repository.findOne({
      where: { id: parseInt(id) },
    });

    if (!data) {
      return res.status(404).json(createErrorResponse("Posko not found", 404));
    }

    await repository.remove(data);
    return res
      .status(200)
      .json({ success: true, message: "Posko deleted successfully" });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res
      .status(500)
      .json(createErrorResponse("Failed to fetch data", 500));
  }
};
