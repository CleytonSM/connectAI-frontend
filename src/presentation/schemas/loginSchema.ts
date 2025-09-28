import * as v from "valibot";

export const LoginSchema = v.object({
  email: v.pipe(
    v.string("Insira seu e-mail"),
    v.email("Formato de e-mail inválido"),
    v.minLength(1, "Informe seu e-mail"),
  ),
});

export type ILoginSchema = v.InferInput<typeof LoginSchema>;
