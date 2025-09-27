"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { PagesEnum } from "../enums/PagesEnum";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface SidebarProps {
  menuItems: MenuItem[];
  basePath?: string;
}

export default function Sidebar({ menuItems, basePath }: SidebarProps) {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.href = PagesEnum.LOGIN;
  };
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <span className="text-xl font-bold text-gray-800">VitalLink</span>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={basePath ? `${basePath}/${item.path}` : item.path}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition rounded-lg"
              >
                <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-red-200">
        <button
          type="button"
          className="flex items-center w-full px-4 py-2 text-red-700 hover:bg-gray-100 rounded-lg transition"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3 text-red-500" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
