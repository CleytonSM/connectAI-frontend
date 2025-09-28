import { useForm } from "react-hook-form";
import { type ILoginSchema, LoginSchema } from "../schemas/loginSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { createUserLoginCommand } from "@/factories/createUserLoginCommand";
import { useAuth } from "../contexts/AuthContext";
import { redirect, RedirectType } from "next/navigation";
import { PagesEnum } from "../enums/PagesEnum";
import { createPath } from "../utils/createPath";

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

    if (response.isRight()) {
      login(response.value);
      const userData = JSON.parse(localStorage.getItem("user-data") || "{}");
      if (userData.label === "DOCTOR") {
        redirect(
          createPath(PagesEnum.DOCTOR_ORION, { id: userData.id }),
          RedirectType.replace,
        );
      } else if (userData.label === "PATIENT") {
        redirect(
          createPath(PagesEnum.PATIENT_ORION, { id: userData.id }),
          RedirectType.replace,
        );
      }
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(handleSuccessSubmit),
    errors,
  };
};
