import { AppDataSource } from "@/data-source";
import { User } from "@/entities/User";
import { Request, Response } from "express";
import { MeResponse } from "./type/me";

export const meHandler = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req.auth?.userId },
      relations: ["role"],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const role = user?.role.name ?? "";
    const access = user?.role?.aksesMobile ?? [];

    const response: MeResponse = {
      status: true,
      data: {
        username: user.username ?? "",
        fullname: user.fullname,
        userId: user.id,
        roleId: user.role?.id ?? 0,
        role: role,
        access: access,
        alias: user.alias ?? "",
        kantor: user.kantor ?? "",
        email: user.email ?? "",

        // TODO: get photo_url from storage
        photoUrl: "https://picsum.photos/300",
      },
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
