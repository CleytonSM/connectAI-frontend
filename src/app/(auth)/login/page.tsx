import { LoginForm } from "@/presentation/components/forms/LoginForm";
import { PagesEnum } from "@/presentation/enums/PagesEnum";
import Link from "next/link";

export default async function Login() {
  return (
    <section className="bg-gray-100 w-full h-full rounded-xl shadow-sm flex items-center justify-center py-6 px-4">
      <div className="w-full flex flex-col gap-4 items-center max-w-sm">
        <h1 className="card-title text-xl">Entre com o seu e-mail</h1>
        <LoginForm />

        <span className="text-xs">
          Ainda não possui uma conta?{" "}
          <Link
            href={PagesEnum.REGISTER}
            className="underline font-bold not-italic"
          >
            Cadastrar-se
          </Link>
        </span>
      </div>
    </section>
  );
}
