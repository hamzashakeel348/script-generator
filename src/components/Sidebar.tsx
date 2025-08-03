"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  Home as HomeIcon,
  Article as ArticleIcon,
  Settings as SettingsIcon,
  Support as SupportIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const navItems = [
  { label: "Script Generator", href: "/script-generator", icon: <HomeIcon /> },
  { label: "Script Library", href: "/script-library", icon: <ArticleIcon /> },
  { label: "Settings", href: "/settings", icon: <SettingsIcon /> },
  { label: "Support", href: "/support", icon: <SupportIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="w-64 min-h-screen bg-white px-4 py-6 hidden md:block">
      <h2 className="text-xl font-semibold mb-6 text-purple-700">
        Script Tool
      </h2>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
              ${
                pathname.startsWith(item.href)
                  ? "bg-[#3661e2] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-10 left-10 right-0">
        <div className="mt-10 text-xs text-gray-500">
          <p className="mb-1">Logged in as</p>
          <p className="font-medium text-gray-800">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <div className="mt-6">
          <SignOutButton>
            <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 cursor-pointer">
              <LogoutIcon fontSize="small" />
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </aside>
  );
}
