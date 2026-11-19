import { AppDataSource } from "@/data-source";
import { AkunLivestreaming } from "@/entities/AkunLivestreaming";
import { MstLiveStreaming } from "@/entities/MstLiveStreaming";
import { matraMapping } from "@/utils/eselonMapping";
import axios from "axios";
import Joi from "joi";
import { compact } from "lodash";
import moment from "moment";

export const querySchema = Joi.object({
  startDate: Joi.string().allow("").optional(),
  endDate: Joi.string().allow("").optional(),
  category: Joi.alternatives()
    .try(Joi.number().valid(1, 2), Joi.string().valid("1", "2"))
    .optional(),
  page: Joi.string().allow("").optional(),
  limit: Joi.string().allow("").optional(),
  search: Joi.string().allow("").optional(),
});

interface GetParams {
  startDate?: string | null;
  endDate?: string | null;
  category?: number | null;
  page?: number;
  limit?: number;
  UptIds?: string[];
}

export interface StrukturOrganisasi {
  penyelenggara_cd: string;
  penyelenggara_nama: string;
  struktur_induk_nama: string;
}

export const getDataLiveStreamingAnd30Sec = async (params: GetParams) => {
  try {
    const liveStreamingRepo = AppDataSource.getRepository(MstLiveStreaming);
    const repoAkunLivestreaming =
      AppDataSource.getRepository(AkunLivestreaming);

    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;

    const query = liveStreamingRepo.createQueryBuilder("livestreaming");
    query.leftJoinAndSelect("livestreaming.akun", "akun");

    if (params.startDate && params.endDate) {
      query.andWhere("livestreaming.tanggal BETWEEN :start AND :end", {
        start: params.startDate,
        end: params.endDate,
      });
    } else if (params.startDate) {
      query.andWhere("livestreaming.tanggal >= :start", {
        start: params.startDate,
      });
    } else if (params.endDate) {
      query.andWhere("livestreaming.tanggal <= :end", { end: params.endDate });
    }

    if (params.category) {
      query.andWhere("livestreaming.category = :category", {
        category: params.category,
      });
    }

    if (params.UptIds) {
      query.andWhere("livestreaming.upt IN (:...UptIds)", {
        UptIds: compact(params.UptIds),
      });
    }

    query
      .andWhere("livestreaming.deleted_at IS NULL")
      .andWhere("livestreaming.deleted_by IS NULL");

    query.orderBy("livestreaming.tanggal", "DESC");
    
    query.skip(offset).take(limit);
    query.select(["livestreaming", "akun"]);

    const [data, total] = await query.getManyAndCount();

    console.log(data, "=====data=====");

    const formatTimestamp = (date: Date | null) =>
      date
        ? moment(date).utcOffset("+07:00").format("YYYY-MM-DD HH:mm:ss")
        : null;

    const formattedData = data.map((item) => {
      const HOST_30S = `https://strategi.kemenhub.go.id/api/getFile`;
      const {
        upt,
        createdAt,
        createdBy,
        deletedAt,
        deletedBy,
        updatedAt,
        updatedBy,
        description,
        category,
        eselonTerkait,
        videoId,
        videoTitle,
        videoDescription,
        videoChannelId,
        videoPublishedAt,
        videoStatusLive,
        akun,
        videoStreamingSchedule,
        ...data
      } = item;
      return {
        ...data,
        linkLive: data.linkLive
          ? data.linkLive
          : `${HOST_30S}/${item.fileUpload}?download=false`,
        description: description ?? category === 1 ? "30 Sec" : "Live Stream",
        unitKerja: akun
          ? {
              unitKerjaId: upt || "",
              namaUnitKerja: akun.nama || "",
              namaUnitKerjaInduk: akun.unitKerja || "",
            }
          : null,
        namaMatra: matraMapping(eselonTerkait || ""),
        eselon: eselonTerkait,
        videoId: videoId,
        videoTitle: videoTitle,
        videoDescription: videoDescription,
        videoChannelId: videoChannelId,
        videoPublishedAt: videoPublishedAt,
        videoStatusLive: videoStatusLive,
        videoStreamingSchedule: videoStreamingSchedule,
        channel:
          akun && category !== 1
            ? {
                name: akun?.nama?.replace("@", "") || "",
                id: videoChannelId,
                urlYoutubeChannel:
                  akun?.urlYoutubeChannel?.replace("@", "") || "",
              }
            : null,
        tanggal: formatTimestamp(item.tanggal),
        category,
      };
    });

    return {
      data: formattedData,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("Database Operation Failed:", err);
    throw new Error("Gagal mengambil data live streaming.");
  }
};
