import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="h-[100vh] flex justify-center items-center bg-gray-100 flex-col text-black">
      <div className="flex justify-center items-center grow flex-col">
        <h1 className="text-5xl mb-4 text-gray-content ">Sample Page</h1>
        <small className="text-gray-content my-3">
          {new Date().toUTCString()}
        </small>
        <Link
          className="text-gray-contrast bg-secondary  py-1 px-4 rounded-md"
          href={"/sample/1"}
        >
         Go to sample page
        </Link>
        {/* Card DaisyUI */}
        <div className="card w-96 bg-base-100 shadow-xl mt-8">
          <figure>
            {/* Usando Next.js Image para evitar erro */}
            <Image src="/globe.svg" alt="Globe" width={96} height={96} className="w-24 h-24" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">DaisyUI Card</h2>
            <p>Este é um exemplo de card usando DaisyUI.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="button">Ação</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
