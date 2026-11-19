// validators/app-config.schema.ts
import Joi from "joi";

export const configValueTypes = [
  "string",
  "number",
  "boolean",
  "json",
  "array",
] as const;

export const createAppConfigSchema = Joi.object({
  platform: Joi.string().max(100).required(),
  key: Joi.string().max(100).required(),
  value: Joi.any().required(),
  valueType: Joi.string()
    .valid(...configValueTypes)
    .required(),
  description: Joi.string().allow("", null),
  isActive: Joi.boolean().default(true),
});

export const updateAppConfigSchema = Joi.object({
  value: Joi.any().optional(),
  valueType: Joi.string()
    .valid(...configValueTypes)
    .optional(),
  description: Joi.string().allow("", null).optional(),
  isActive: Joi.boolean().optional(),
});
