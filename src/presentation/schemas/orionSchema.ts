import * as v from "valibot";

export const OrionSchema = v.object({
  message: v.string(),
});

export type IOrionSchema = v.InferInput<typeof OrionSchema>;
