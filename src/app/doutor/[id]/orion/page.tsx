import { OrionChatbot } from "@/presentation/components/forms/Orion";

export default function OrionPage() {
  return (
    <section className="h-full w-full">
      <div className="h-full w-full bg-gray-200 py-4 px-2 md:px-4 rounded-xl">
        <OrionChatbot />
      </div>
    </section>
  );
}
