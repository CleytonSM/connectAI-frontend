import Link from "next/link";
import {
  User,
  LogOut,
  Calendar,
  FileText,
  FileCheck,
  FileWarning,
} from "lucide-react";
import { PagesEnum } from "@/presentation/enums/PagesEnum";

const menuItems = [
  {
    label: "Agenda",
    path: PagesEnum.AGENDAMENTO,
    icon: Calendar,
  },
  {
    label: "Consultas",
    path: PagesEnum.APPOINTMENTS,
    icon: FileText,
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

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <span className="text-xl font-bold text-gray-800">ConnectAI</span>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition rounded-lg"
              >
                <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          type="button"
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <LogOut className="w-5 h-5 mr-3 text-gray-500" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
