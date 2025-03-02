"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignIn, UserButton, useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { School } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Notices", path: "/notices" },
  { name: "Campus", path: "/campus" },
  { name: "Academics", path: "/academics" },
  { name: "Admissions", path: "/admissions" },
  { name: "Departments", path: "/departments" },
  { name: "Faculty", path: "/faculty" },
  { name: "Important Contacts", path: "/contacts" },
  { name: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <School className="h-6 w-6 text-[#318CE7]" />
            <span className="hidden font-bold sm:inline-block">
              Itahar Government Polytechnic
            </span>
          </Link>
        </div>

        <div className="flex-1">
          <div className="hidden md:flex md:gap-2 md:overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.path
                    ? "bg-[#318CE7] text-white"
                    : "text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isSignedIn && (
            <Link
              href="/sign-in"
              className={cn(
                "flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname.startsWith("/sign-in")
                  ? "bg-[#318CE7] text-white"
                  : "text-foreground"
              )}
            >
              Sign in
            </Link>
          )}

          {isSignedIn && (
            <Link
              href="/admin"
              className={cn(
                "flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname.startsWith("/admin")
                  ? "bg-[#318CE7] text-white"
                  : "text-foreground"
              )}
            >
              Dashboard
            </Link>
          )}
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
