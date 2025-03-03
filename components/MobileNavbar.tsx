"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { School, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FirstNameDisplay from "./FirstNameDisplay";

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

export default function MobileNavbar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <School className="h-6 w-6 text-[#318CE7]" />
            <span className="font-bold">Itahar Govt. Polytechnic</span>
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-2 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex h-10 items-center justify-start rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === item.path
                      ? "bg-[#318CE7] text-white"
                      : "text-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!isSignedIn && (
                <Link
                  href="/sign-in"
                  className={cn(
                    "flex h-10 items-center justify-start rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname.startsWith("/sign-in")
                      ? "bg-[#318CE7] text-white"
                      : "text-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  Admin Login
                </Link>
              )}
              {isSignedIn && (
                <Link
                  href="/admin"
                  className={cn(
                    "flex h-10 items-center justify-start rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname.startsWith("/admin")
                      ? "bg-[#318CE7] text-white"
                      : "text-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
            <div className="font-semibold m-4 flex gap-2 space-y-2 ">
              <div className="">
                <UserButton />
              </div>
              <FirstNameDisplay />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
