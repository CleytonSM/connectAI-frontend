import Sidebar from "@/presentation/components/Sidebar";
import { PagesEnum } from "@/presentation/enums/PagesEnum";
import { createPath } from "@/presentation/utils/createPath";
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
      path: createPath(PagesEnum.PATIENT_SCHEDULE, { id: params.id }),
      icon: Calendar,
    },
    {
      label: "Historico",
      path: createPath(PagesEnum.PATIENT_HISTORY, { id: params.id }),
      icon: FileCheck,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
