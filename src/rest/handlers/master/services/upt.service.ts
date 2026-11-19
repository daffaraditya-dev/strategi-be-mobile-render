import { config } from "@/config";
import { request } from "@/utils/axios";

export interface StrukturOrganisasiItem {
  penyelenggara_cd: string;
  penyelenggara_nama: string;
  struktur_induk_nama: string;
}

export interface ResponseStrukturOrganisasi {
  status: boolean;
  data: StrukturOrganisasiItem[];
  code: number;
  total: number;
}

export interface StrukturOrganisasiParams {
  page?: number;
  perPage?: number;
  name?: string;
}

export const getStrukturOrganisasiSik = async ({
  page = 1,
  perPage = 1000,
  name = "",
}: StrukturOrganisasiParams) => {
  const query = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
    name: name ?? "",
  });

  const result = await request<ResponseStrukturOrganisasi>({
    method: "get",
    url: `${config.hubnetApiUrl}/struktur-organisasi-sik?${query.toString()}`,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });

  return result;
};
