import { useForm } from "react-hook-form";
import { type ILoginSchema, LoginSchema } from "../schemas/loginSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { createUserLoginCommand } from "@/factories/createUserLoginCommand";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { PagesEnum } from "../enums/PagesEnum";
import { createPath } from "../utils/createPath";

const loginCommand = createUserLoginCommand();

export const useLoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();

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
        router.push(createPath(PagesEnum.DOCTOR_SCHEDULE, { id: userData.id }));
      } else if (userData.label === "PATIENT") {
        router.push(
          createPath(PagesEnum.PATIENT_SCHEDULE, { id: userData.id }),
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
