import Sidebar from "@/presentation/components/Sidebar";
import { PagesEnum } from "@/presentation/enums/PagesEnum";
import { createPath } from "@/presentation/utils/createPath";
import { Calendar, FileCheck } from "lucide-react";
import React from "react";

export default function DoctorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const menuItems = [
    {
      label: "Agenda",
      path: createPath(PagesEnum.PATIENT_SCHEDULE, { id }),
      icon: Calendar,
    },
    {
      label: "Historico",
      path: createPath(PagesEnum.PATIENT_HISTORY, { id }),
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
