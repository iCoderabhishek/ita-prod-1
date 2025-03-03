"use client";

import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsPanel from "@/components/admin/AdminPanel";
import NoticesPanel from "@/components/admin/NoticePanel";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="container py-12 sm: m-5  ">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="notices">Notices</TabsTrigger>
          </TabsList>
          <TabsContent value="analytics" className="mt-6">
            <AnalyticsPanel />
          </TabsContent>
          <TabsContent value="notices" className="mt-6 md:m-4 sm: mr-4">
            <NoticesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
