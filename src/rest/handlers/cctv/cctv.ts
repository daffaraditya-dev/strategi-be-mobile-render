import { getDataCctv } from "@/services/backendApiHubnet";
import { toCamelCase } from "@/utils/convert";
import { Request, Response } from "express";
import Joi from "joi";

const cctvRequest = Joi.object({
  matra: Joi.string().optional(),
  namaProvinsi: Joi.string().optional(),
  namaKabupatenKota: Joi.string().optional(),
  search: Joi.string().optional(),
});

export const cctvHandler = async (req: Request, res: Response) => {
  const { error, value } = cctvRequest.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }

  try {
    const { matra, namaProvinsi, namaKabupatenKota, search } = value;

    const cctv = await getDataCctv();
    if (matra) {
      cctv.data = cctv.data.filter((item) => item.matra.indexOf(matra) > -1);
    }
    if (namaProvinsi) {
      cctv.data = cctv.data.filter(
        (item) =>
          item.nama_provinsi && item.nama_provinsi.indexOf(namaProvinsi) > -1
      );
    }
    if (namaKabupatenKota) {
      cctv.data = cctv.data.filter(
        (item) =>
          item.nama_kabupaten_kota &&
          item.nama_kabupaten_kota.indexOf(namaKabupatenKota) > -1
      );
    }
    if (search) {
      cctv.data = cctv.data.filter(
        (item) =>
          (item.nama_lokasi && item.nama_lokasi.indexOf(search) > -1) ||
          (item.nama_cctv && item.nama_cctv.indexOf(search) > -1) ||
          (item.tag_kategori && item.tag_kategori.indexOf(search) > -1) ||
          (item.matra && item.matra.indexOf(search) > -1) ||
          (item.nama_kabupaten_kota &&
            item.nama_kabupaten_kota.indexOf(search) > -1) ||
          (item.nama_provinsi && item.nama_provinsi.indexOf(search) > -1) ||
          (item.nama_pengelola && item.nama_pengelola.indexOf(search) > -1)
      );
    }

    res.json({ status: true, data: toCamelCase(cctv.data) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
