import { config } from "@/config";
import { request } from "@/utils/axios";
import { AppDataSource } from "@/data-source";
import { Role } from "@/entities/Role";
export interface RoleItem {
  id: number;
  name: string;
  deskripsi?: string;
  akses: string[];
  createBy: string;
  createDate: string;
  updateBy?: string;
  updateDate?: string;
  isAdmin: boolean;
}

export interface ResponseListRole {
  status: boolean;
  data: RoleItem[];
  message: string;
  code: number;
  total: number;
}

export const listRole = async (searchTerm: string = "") => {
  const body = {
    search_term: searchTerm,
  };

  const result = await request<ResponseListRole>({
    method: "post",
    url: `${config.hubnetApiUrl.replace("hubnet", "strategi")}/manajemen-user/role/list-role`,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body,
  });

  return result;
};

export const findFilterCustomRole = async (name?: string) => {
  const repo = AppDataSource.getRepository(Role);

  console.log("===== name =====", name);

  const qb = repo
    .createQueryBuilder("role")
    .orderBy("role.updateDate", "DESC", "NULLS LAST")
    .addOrderBy("role.createDate", "DESC", "NULLS LAST");

  if (name) {
    qb.where("role.name ILIKE :filter", { filter: `%${name}%` });
  }

  const data = await qb.getMany();
  const total = await qb.getCount();

  return {
    status: true,
    message: "Data berhasil ditampilkan",
    data,
    total,
  };
};


