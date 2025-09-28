import React from "react";
import { FileText } from "lucide-react";
import { DocumentValidationChat } from "@/presentation/components/DocumentValidationChat";

export default function DoctorRequestsPage() {
  return (
    <main className="p-8">
      <div className="flex items-center mb-4">
        <FileText className="w-8 h-8 text-green-500 mr-2" />
        <h1 className="text-3xl font-bold">Solicitações</h1>
      </div>
      <div className="mt-6">
        <DocumentValidationChat />
      </div>
    </main>
  );
}
