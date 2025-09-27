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
      path: createPath(PagesEnum.DOCTOR_SCHEDULE, { id: params.id }),
      icon: Calendar,
    },
    {
      label: "Exames",
      path: createPath(PagesEnum.DOCTOR_EXAMS, { id: params.id }),
      icon: FileCheck,
    },
    {
      label: "Solicitações",
      path: createPath(PagesEnum.DOCTOR_SOLICITATIONS, { id: params.id }),
      icon: FileWarning,
    },
    {
      label: "Auditoria",
      path: createPath(PagesEnum.DOCTOR_AUDIT, { id: params.id }),
      icon: FileText,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
