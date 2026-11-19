// services/app-config.service.ts
import { AppConfig } from "@/entities/AppConfig";
import {
  createAppConfigSchema,
  updateAppConfigSchema,
} from "../validators/app-config.schema";
import { validate } from "../utils/validate";
import { AppDataSource } from "@/data-source";
import { DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { randomUUID } from "crypto";

const repo = AppDataSource.getRepository(AppConfig);

export async function createAppConfig(
  payload: unknown,
): Promise<AppConfig> {
  const dto = validate<DeepPartial<AppConfig>>(
    createAppConfigSchema,
    payload,
  );

  const entity = repo.create({ ...dto, id: randomUUID(), });
  return repo.save(entity);
}


export async function updateAppConfig(
  id: string,
  payload: unknown,
): Promise<AppConfig> {
  const dto = validate<QueryDeepPartialEntity<AppConfig>>(
    updateAppConfigSchema,
    payload,
  );

  const result = await repo.update({ id }, dto);

  if (result.affected === 0) {
    throw new Error("Config not found");
  }

  return findAppConfigById(id);
}

export async function toggleAppConfigActive(
  id: string,
  isActive: boolean,
): Promise<void> {
  await repo.update({ id }, { isActive });
}

export async function findAppConfigById(
  id: string,
): Promise<AppConfig> {
  const config = await repo.findOne({ where: { id } });

  if (!config) {
    throw new Error("Config not found");
  }

  return config;
}

export async function findAppConfigByKey(
  platform: string,
  key: string,
): Promise<AppConfig | null> {
  return repo.findOne({
    where: {
      platform,
      key,
      isActive: true,
    },
  });
}

export async function getAppConfigValue<T = unknown>(
  platform: string,
  key: string,
): Promise<T | null> {
  const config = await findAppConfigByKey(platform, key);
  return config ? (config.value as T) : null;
}

export async function listAppConfigsByPlatform(
  platform: string,
): Promise<AppConfig[]> {
  return repo.find({
    where: { platform },
    order: { key: "ASC" },
  });
}

export async function deleteAppConfig(id: string): Promise<void> {
  await repo.delete({ id });
}
