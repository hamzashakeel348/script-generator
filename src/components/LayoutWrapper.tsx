"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebarRoutes = ["/sign-in", "/sign-up", "/sign-up/complete", "/"];
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return (
    <div className="flex h-screen">
      {!shouldHideSidebar && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {/* Top Navbar - only if not on auth pages */}
        {/* {!shouldHideSidebar && (
          <header className="flex justify-end items-center p-4 h-16 shadow-sm border-b bg-white">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        )} */}

        <main className="flex-1 overflow-auto bg-white p-4">{children}</main>
      </div>
    </div>
  );
}
