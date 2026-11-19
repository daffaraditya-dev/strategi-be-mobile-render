import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "@/data-source";
import { RefreshTokenEntity } from "@/entities/RefreshTokenEntity";
import { User } from "@/entities/User";
import { config } from "@/config";
import ms from "ms";
import Joi from "joi";

const refreshTokenRequest = Joi.object({
  refreshToken: Joi.string().required(),
});

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const { error, value } = refreshTokenRequest.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }
  try {
    const { refreshToken } = value;
    const refreshTokenRepository =
      AppDataSource.getRepository(RefreshTokenEntity);
    const userRepository = AppDataSource.getRepository(User);

    // Find the refresh token in the database
    const storedToken = await refreshTokenRepository.findOne({
      where: { refreshToken, revoked: false, isMobileApp: true },
    });

    if (!storedToken) {
      return res
        .status(403)
        .json({ status: false, message: "Invalid or expired refresh token" });
    }

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      config.jwtSecret,
      async (err: any, decoded: any) => {
        if (err) {
          await refreshTokenRepository.delete({ refreshToken });
          return res
            .status(403)
            .json({ error: "Invalid or expired refresh token" });
        }

        const user = await userRepository.findOne({
          where: { id: decoded.userId },
          relations: ["role"],
        });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const roles = user.role ? [user.role.name ?? ""] : [];
        const expiresInMs = ms(config.jwtExpiresIn as ms.StringValue) || 0;
        const expiresInSeconds = Math.floor(expiresInMs / 1000);

        // Generate a new access token
        const newAccessToken = jwt.sign(
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

        // Optionally generate a new refresh token (rolling refresh tokens)
        const newRefreshToken = jwt.sign(
          { userId: user.id },
          config.jwtSecret,
          { expiresIn: config.jwtRefreshExpiresIn as ms.StringValue }
        );

        // Delete the old refresh token and save the new one
        await refreshTokenRepository.delete({ refreshToken });

        const newTokenEntity = refreshTokenRepository.create({
          username: user.username,
          refreshToken: refreshToken,
          dateCreated: new Date(),
          revoked: false,
          isMobileApp: true,
        });

        await refreshTokenRepository.save(newTokenEntity);

        return res.json({
          status: true,
          data: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            tokenType: "Bearer",
            expiresIn: expiresInSeconds,
          },
        });
      }
    );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
