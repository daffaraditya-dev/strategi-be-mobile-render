import Joi from "joi";

export const incidenteportSchema = Joi.object({
  nama_laporan: Joi.string().required(),
  nama_pelapor: Joi.string(),
  email: Joi.string().email(),
  no_tlp: Joi.string(),
  kronologi_kejadian: Joi.string().required(),
  dampak: Joi.string().required(),
  jenis_kejadian: Joi.string().required(),
  waktu_kejadian: Joi.string().isoDate().required(),
  waktu_kejadian_zone: Joi.number(),
  data_pendukung: Joi.array(),
  lokasi: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  upt_terkait: Joi.array(),
  eselon_terkait: Joi.array(),
  catatan_tindak_lanjut_awal: Joi.string(),
});

export const tindakLanjutSchema = Joi.object({
  id_laporan_kejadian: Joi.string().required(),
  tindak_lanjut: Joi.string(),
  waktu_tindak_lanjut: Joi.string().isoDate(),
  data_pendukung_tindak_lanjut: Joi.array(),
});

export interface IncidentReportParams {
  id?: string;
  nama_laporan: string;
  nama_pelapor: string;
  email: string;
  no_tlp: string;
  kronologi_kejadian: string;
  dampak: string;
  jenis_kejadian: string;
  waktu_kejadian: string;
  waktu_kejadian_zone: number;
  data_pendukung: string[];
  lokasi: string;
  longitude: number;
  latitude: number;
  upt_terkait: string[];
  eselon_terkait: string[];
  catatan_tindak_lanjut_awal: string;
  id_verifikator_1?: string;
}

export interface tindakLanjutParams {
  id?: string;
  id_laporan_kejadian: string;
  tindak_lanjut: string;
  waktu_tindak_lanjut: string;
  data_pendukung_tindak_lanjut: string[];
}
