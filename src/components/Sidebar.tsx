"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignOutButton, useUser, UserButton } from "@clerk/nextjs";
import {
  Home as HomeIcon,
  Article as ArticleIcon,
  Settings as SettingsIcon,
  Support as SupportIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const navItems = [
  {
    label: "Script Generator",
    href: "/script-generator",
    icon: <Image src="/generator.png" alt="Logo" width={20} height={20} />,
  },
  {
    label: "Script Library",
    href: "/script-library",
    icon: <Image src="/library.png" alt="Logo" width={20} height={20} />,
  },
  //   {
  //     label: "Settings",
  //     href: "/settings",
  //     icon: <Image src="/settings.png" alt="Logo" width={20} height={20} />,
  //   },
  {
    label: "Support",
    href: "/support",
    icon: <Image src="/support.png" alt="Logo" width={20} height={20} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="w-70 min-h-screen bg-white px-4 py-6 hidden md:block">
      <div className="flex items-center gap-2 mb-6">
        <Image src="/logo-new.png" alt="Logo" width={30} height={30} />
        <h2 className="text-xl font-medium text-black italic">
          1 Second Script
        </h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium 
              ${
                pathname.startsWith(item.href)
                  ? "bg-[#2463EB] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-5 left-7 right-0">
        <div className="mt-10 text-sm text-gray-500 flex items-center gap-2">
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard: {
                  backgroundColor: "white",
                },
              },
            }}
          />

          <p className="font-medium text-gray-800">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <div className="mt-6">
          <SignOutButton>
            <button className="text-sm bg-[#2463EB] w-60 text-center text-white rounded-[10px] px-4 py-2 cursor-pointer">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </aside>
  );
}
