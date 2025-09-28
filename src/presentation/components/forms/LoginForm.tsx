"use client";

import Button from "../Button";
import Input from "../Input";
import { useLoginForm } from "@/presentation/hooks/useLoginForm";

export const LoginForm = () => {
  const { register, handleSubmit, errors } = useLoginForm();

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          label="E-mail"
          placeholder="email@example.com"
          className="w-full"
          {...register("email")}
          invalid={!!errors.email}
          helper={errors.email?.message}
        />
      </div>

      <Button type="submit" className="btn-neutral">
        Entrar
      </Button>
    </form>
  );
};
