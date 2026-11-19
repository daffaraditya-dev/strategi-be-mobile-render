import { AppDataSource } from "@/data-source";
import { User } from "@/entities/User";
import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "@/config";
import ms from "ms";
import { LoginResponse } from "./type/login";
import { RefreshTokenEntity } from "@/entities/RefreshTokenEntity";

const loginRequest = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginHandler = async (req: Request, res: Response) => {
  const { error } = loginRequest.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { username, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const refreshTokenRepository =
      AppDataSource.getRepository(RefreshTokenEntity);
    const user = await userRepository.findOne({
      where: { username },
      relations: ["role"],
    });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const roles = user.role ? [user.role.name ?? ""] : [];
    const expiresInMs = ms(config.jwtExpiresIn as ms.StringValue) || 0;
    const expiresInSeconds = Math.floor(expiresInMs / 1000);

    const accessToken = jwt.sign(
      {
        username: user.username,
        userId: user.id,
        roles,
        roleName: user.role?.name ?? "",
        roleId: user.role?.id ?? 0,
        kantor: user.kantor,
      },
      config.jwtSecret,
      { expiresIn: expiresInSeconds }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      {
        expiresIn: config.jwtRefreshExpiresIn as ms.StringValue,
      }
    );

    const refreshTokenEntity = refreshTokenRepository.create({
      username: user.username,
      refreshToken: refreshToken,
      dateCreated: new Date(),
      revoked: false,
      isMobileApp: true,
    });

    await refreshTokenRepository.save(refreshTokenEntity);

    const response: LoginResponse = {
      status: true,
      data: {
        username: user.username ?? "",
        fullname: user.fullname,
        userId: user.id,
        roleId: user.role?.id ?? 0,
        roles,
        accessToken,
        refreshToken,
        tokenType: "Bearer",
        expiresIn: expiresInSeconds,
      },
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
