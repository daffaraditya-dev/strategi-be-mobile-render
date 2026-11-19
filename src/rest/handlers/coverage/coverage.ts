import { AppDataSource } from "@/data-source";
import { RequestLivestreaming } from "@/entities/RequestLivestreaming";
import { toCamelCase } from "@/utils/convert";
import { Request, Response } from "express";
import Joi from "joi";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const coverageRequest = Joi.object({
  tanggalAwal: Joi.string().optional(),
  tanggalAkhir: Joi.string().optional(),
  matra: Joi.string().optional(),
  kontributor: Joi.string().optional(),
  tipeLokasi: Joi.string().optional(),
  tipeMedia: Joi.string().optional(),
  statusLive: Joi.string().optional(),
});

export const coverageHandler = async (req: Request, res: Response) => {
  const { error, value } = coverageRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const {
      tanggalAwal,
      tanggalAkhir,
      matra,
      kontributor,
      tipeLokasi,
      tipeMedia,
      statusLive,
    } = value;
    const repository = AppDataSource.getRepository(RequestLivestreaming);

    let whereClause: any = {};

    if (tanggalAwal && tanggalAkhir) {
      whereClause.jadwalStreaming = Between(
        new Date(tanggalAwal),
        new Date(tanggalAkhir)
      );
    } else if (tanggalAwal) {
      whereClause.jadwalStreaming = MoreThanOrEqual(new Date(tanggalAwal));
    } else if (tanggalAkhir) {
      whereClause.jadwalStreaming = LessThanOrEqual(new Date(tanggalAkhir));
    }

    if (matra) {
      whereClause.matra = matra;
    }

    if (kontributor) {
      whereClause.kontributor = kontributor;
    }

    if (tipeLokasi) {
      whereClause.tipeLokasi = tipeLokasi;
    }

    if (tipeMedia) {
      whereClause.tipeMedia = tipeMedia;
    }

    if (statusLive) {
      whereClause.statusLive = statusLive;
    }

    const record = await repository.find({
      where: whereClause,
    });
    res.json({
      status: true,
      data: toCamelCase(
        record.map((item) => {
          return {
            ...item,
            jadwalStreaming: item.jadwalStreaming?.toISOString(),
            createDate: item.createDate?.toISOString(),
            updateDate: item.updateDate?.toISOString(),
            publishedAt: item.publishedAt?.toISOString(),
          };
        })
      ),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
