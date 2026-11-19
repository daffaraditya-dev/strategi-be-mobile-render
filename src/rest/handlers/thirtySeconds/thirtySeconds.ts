import { AppDataSource } from "@/data-source";
import { ThirtySecondsVideo } from "@/entities/ThirtySecondsVideo";
import { Request, Response } from "express";

export const thirtySecondsHandler = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(ThirtySecondsVideo);
    const record = await repository.find();

    const response = record.map((item) => {
      return {
        id: item.idCctv,
        namaLokasi: item.namaLokasi,
        namaCctv: item.namaCctv,
        streamUrl: item.streamUrl,
        status: item.status,
      };
    });
    res.json({ status: true, data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
