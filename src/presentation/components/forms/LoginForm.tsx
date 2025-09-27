"use client";

import Button from "../Button";
import Input from "../Input";

export const LoginForm = () => {
  return (
    <form className="w-full flex flex-col gap-4">
      <Input
        type="text"
        label="E-mail"
        name="email"
        placeholder="email@example.com"
        className="w-full"
      />

      <Button type="submit" className="btn-neutral">
        Entrar
      </Button>
    </form>
  );
};
