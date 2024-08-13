import { z } from "zod";

export const generateEmptyState = <T>(
  schema: z.ZodObject<any>,
  defaults: Record<string, any> = {},
): T => {
  const emptyState: any = {};

  for (const key in schema.shape) {
    const field = schema.shape[key];

    if (field instanceof z.ZodString) {
      emptyState[key] = "";
    } else if (field instanceof z.ZodNumber) {
      emptyState[key] = 0;
    } else if (field instanceof z.ZodBoolean) {
      emptyState[key] = false;
    } else if (field instanceof z.ZodDate) {
      emptyState[key] = defaults[key] || "";
    } else if (field instanceof z.ZodArray) {
      emptyState[key] = [];
    } else if (field instanceof z.ZodObject) {
      emptyState[key] = generateEmptyState(field);
    } else if (field instanceof z.ZodEnum || field instanceof z.ZodNativeEnum) {
      emptyState[key] = defaults[key] || "";
    } else if (field instanceof z.ZodUnion) {
      emptyState[key] = defaults[key] || {};
    } else {
      emptyState[key] = null; // Default case for unsupported types
    }
  }

  return emptyState;
};
