import { AppDataSource } from "@/data-source";
import { User } from "@/entities/User";
import { Request, Response } from "express";

export const getUserApprovalHandler = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(User);
    const record = await repository
      .createQueryBuilder("User")
      .innerJoinAndSelect("User.role", "role")
      .where("'Laporan_Approve_Laporan' = any(role.akses_mobile)")
      .getMany();

    const result = record.map((item) => ({
      id: item.id,
      username: item.username,
      fullname: item.fullname,
      kantor: item.kantor,
      role: item.role.name,
    }));
    res.json({ status: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
