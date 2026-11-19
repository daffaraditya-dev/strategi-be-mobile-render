// utils/validate.ts
import type { ObjectSchema } from "joi";

export function validate<T>(
  schema: ObjectSchema,
  payload: unknown,
): T {
  const { value, error } = schema.validate(payload, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    throw new Error(
      error.details.map((d) => d.message).join(", "),
    );
  }

  return value as T;
}
