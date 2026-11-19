import { Request, Response } from "express";
import {
  getDataLiveStreamingAnd30Sec,
  querySchema,
  StrukturOrganisasi,
} from "./services/liveStreamingand30sec.service";
import axios from "axios";
import { isValidPenyelenggaraCd } from "@/utils/uptChecker";

export const getLiveStreamingHandler = async (req: Request, res: Response) => {
  try {
    const { error, value } = querySchema.validate(req.query);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    // const id_user = req.auth?.userId!;
    const response = await axios.get<{
      status: boolean;
      data: StrukturOrganisasi[];
    }>("https://strategi.kemenhub.go.id/api/hubnet/struktur-organisasi-sik?", {
      params: { page: 1, perPage: 1000, name: value.search },
    });

    const uptIds =
      response?.data?.data?.map((item) => item.penyelenggara_cd) || [];

    const { data, ...pagination } = await getDataLiveStreamingAnd30Sec({
      ...value,
      category: value?.category || 2,
      UptIds: isValidPenyelenggaraCd(value.search) ? [value.search] : uptIds,
    });

    return res.json({ status: true, data, pagination });
  } catch (err) {
    console.error("Error fetching terminal data:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const get30SecHandler = async (req: Request, res: Response) => {
  try {
    const { error, value } = querySchema.validate(req.query);
    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }
    // const id_user = req.auth?.userId!;
    const response = await axios.get<{
      status: boolean;
      data: StrukturOrganisasi[];
    }>("https://strategi.kemenhub.go.id/api/hubnet/struktur-organisasi-sik?", {
      params: { page: 1, perPage: 1000, name: value.search },
    });

    const uptIds =
      response?.data?.data?.map((item) => item.penyelenggara_cd) || [];
    const { data, ...pagination } = await getDataLiveStreamingAnd30Sec({
      ...value,
      category: value?.category || 1,
      UptIds: isValidPenyelenggaraCd(value.search) ? [value.search] : uptIds,
    });

    return res.json({ status: true, data, pagination });
  } catch (err) {
    console.error("Error fetching terminal data:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
