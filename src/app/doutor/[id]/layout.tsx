"use client";
import Sidebar from "@/presentation/components/Sidebar";
import { PagesEnum } from "@/presentation/enums/PagesEnum";
import { createPath } from "@/presentation/utils/createPath";
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
      label: "Orion",
      path: createPath(PagesEnum.DOCTOR_ORION, { id }),
      icon: "Bot",
    },
    {
      label: "Agenda",
      path: createPath(PagesEnum.DOCTOR_SCHEDULE, { id }),
      icon: "Calendar",
    },
    {
      label: "Exames",
      path: createPath(PagesEnum.DOCTOR_EXAMS, { id }),
      icon: "FileCheck",
    },
    {
      label: "Solicitações",
      path: createPath(PagesEnum.DOCTOR_SOLICITATIONS, { id }),
      icon: "FileWarning",
    },
    {
      label: "Auditoria",
      path: createPath(PagesEnum.DOCTOR_AUDIT, { id }),
      icon: "FileText",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
