import { Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { LoginResponse } from "./type/login";
import { config } from "@/config";
import { AppDataSource } from "@/data-source";
import { User } from "@/entities/User";
import ms from "ms";

const exchangeRequest = Joi.object({
  accessToken: Joi.string().required(),
});

export const tokenExchange = async (req: Request, res: Response) => {
  const { error } = exchangeRequest.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { accessToken } = req.body;

  try {
    const decodedToken = jwt.decode(accessToken) as jwt.JwtPayload;
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ error: "Invalid access token" });
    }
    const userId = decodedToken.userId;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["role"],
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const roles = user.role ? [user.role.name ?? ""] : [];
    const newaccessToken = jwt.sign(
      {
        username: user.username,
        userId: user.id,
        roles,
        roleName: user.role?.name ?? "",
        roleId: user.role?.id ?? 0,
        kantor: user.kantor,
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn as ms.StringValue }
    );

    const response: LoginResponse = {
      status: true,
      data: {
        username: user.username ?? "",
        fullname: user.fullname,
        userId: user.id,
        roleId: user.role?.id ?? 0,
        roles,
        accessToken: newaccessToken,
        refreshToken: "",
        tokenType: "Bearer",
        expiresIn: 0,
      },
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
