import type { IPageParams } from "@/presentation/@types/IPageParams";
import { createGetSampleQuery } from "@/factories/createGetSampleQuery";
import { NavigateBackButton } from "@/presentation/components/NavigateBackButton";

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

  return (
    <main className="h-[100vh] flex justify-center bg-gray-100 items-center flex-col text-black">
      <div className="flex justify-center items-center grow space-y-4 flex-col">
        <h1 className="text-5xl mb-4">
          {sample.name} - {sample.id}
        </h1>
        <NavigateBackButton />
      </div>
    </main>
  );
}
