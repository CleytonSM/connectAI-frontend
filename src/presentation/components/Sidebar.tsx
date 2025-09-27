"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import * as Icons from "lucide-react";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";
import { PagesEnum } from "../enums/PagesEnum";

interface MenuItem {
  label: string;
  path: string;
  icon?: React.ElementType | string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  basePath?: string;
}

export default function Sidebar({ menuItems, basePath }: SidebarProps) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    return;
  }, [open]);

  const handleLogout = () => {
    logout();
    window.location.href = PagesEnum.LOGIN;
  };

  const renderMenuItems = (onClick?: () => void) => (
    <ul className="space-y-2">
      {menuItems.map((item) => (
        <li key={item.label}>
          <Link
            href={basePath ? `${basePath}/${item.path}` : item.path}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition rounded-lg"
            onClick={() => onClick?.()}
          >
            {(() => {
              // Resolve icon: if it's a string, look it up from lucide-react imports
              const lucideIcons = Icons as unknown as Record<
                string,
                React.ElementType
              >;
              const Icon: React.ElementType | undefined =
                typeof item.icon === "string"
                  ? lucideIcons[item.icon]
                  : (item.icon as React.ElementType);
              if (!Icon) return <span className="w-5 h-5 mr-3" />;
              return <Icon className="w-5 h-5 mr-3 text-gray-500" />;
            })()}
            <span className="font-medium">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop / large screens */}
      <aside className="hidden md:flex h-screen w-64 bg-white border-r border-gray-200 flex-col shadow-sm">
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
          <span className="text-xl font-bold text-gray-800">VitalLink</span>
        </div>
        <nav className="flex-1 py-4">{renderMenuItems()}</nav>
        <div className="p-4 border-t border-red-200">
          <Button
            type="button"
            className="flex items-center w-full px-4 py-2 text-red-700 hover:bg-gray-100 rounded-lg transition"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3 text-red-500" />
            <span>Sair</span>
          </Button>
        </div>
      </aside>

      {/* Mobile: hamburger button */}
      <Button
        type="button"
        aria-label="Open menu"
        className="md:hidden fixed left-4 top-4 z-40 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-md text-gray-700"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile: full-screen drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <span className="text-lg font-bold">VitalLink</span>
            <Button
              type="button"
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-auto py-6 px-4">
            {renderMenuItems(() => setOpen(false))}
          </nav>

          <div className="p-4 border-t">
            <Button
              type="button"
              className="flex items-center w-full px-4 py-3 text-red-700 hover:bg-gray-100 rounded-lg transition"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
            >
              <LogOut className="w-5 h-5 mr-3 text-red-500" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
