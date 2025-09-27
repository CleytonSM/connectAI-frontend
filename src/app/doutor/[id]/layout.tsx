import Sidebar from "@/presentation/components/Sidebar";
import { PagesEnum } from "@/presentation/enums/PagesEnum";
import { Calendar, FileCheck, FileWarning, FileText } from "lucide-react";
import React from "react";

export default function DoctorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const menuItems = [
    {
      label: "Agenda",
      path: PagesEnum.AGENDAMENTO,
      icon: Calendar,
    },
    {
      label: "Exames",
      path: PagesEnum.EXAMS,
      icon: FileCheck,
    },
    {
      label: "Solicitações",
      path: PagesEnum.SOLICITATIONS,
      icon: FileWarning,
    },
    {
      label: "Auditoria",
      path: PagesEnum.AUDIT,
      icon: FileText,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar menuItems={menuItems} basePath={`/doutor/${params.id}`} />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
