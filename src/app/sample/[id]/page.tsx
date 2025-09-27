import type { IPageParams } from "@/presentation/@types/IPageParams";
import { createGetSampleQuery } from "@/factories/createGetSampleQuery";
import { NavigateBackButton } from "@/presentation/components/NavigateBackButton";
import Sidebar from "@/presentation/components/Sidebar";
import { Table, TableColumn } from "@/presentation/components/Table";

const getSampleQuery = createGetSampleQuery();

async function getSample(id: number) {
  return await getSampleQuery.execute({ id });
}

export default async function Home({
  params,
}: IPageParams<undefined, { id: string }>) {
  const response = await getSample(Number(params?.id));
  if (response.isLeft()) {
    return (
      <div>
        <h1>Error on sample page!</h1>
      </div>
    );
  }

  const sample = response.value;
  // Exemplo de dados para tabela
  type ExampleRow = { id: string; name: string };
  const columns: TableColumn<ExampleRow>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Nome" },
  ];
  const data: ExampleRow[] = [
    { id: String(sample.id), name: sample.name },
    { id: "2", name: "Maria" },
    { id: "3", name: "João" },
    { id: "4", name: "Ana" },
    { id: "5", name: "Carlos" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <main className="flex-1 flex justify-center items-center flex-col">
        <div className="flex justify-center items-center grow space-y-4 flex-col w-full max-w-xl">
          <h1 className="text-5xl mb-4">
            {sample.name} - {sample.id}
          </h1>
          <Table columns={columns} data={data} />
          <NavigateBackButton />
        </div>
      </main>
    </div>
  );
}
