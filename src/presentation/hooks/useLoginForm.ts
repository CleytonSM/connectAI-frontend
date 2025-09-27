import { useForm } from "react-hook-form";
import { type ILoginSchema, LoginSchema } from "../schemas/loginSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { createUserLoginCommand } from "@/factories/createUserLoginCommand";
import { useAuth } from "../contexts/AuthContext";

const loginCommand = createUserLoginCommand();

export const useLoginForm = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleSuccessSubmit(data: ILoginSchema) {
    const response = await loginCommand.execute({
      email: data.email,
    });

    // TO-DO: redirecionar usuário para dashboard
    if (response.isRight()) {
      login(response.value);
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(handleSuccessSubmit),
    errors,
  };
};
