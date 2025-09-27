import Link from "next/link";

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
         
        </Link>
      </div>
    </main>
  );
}
