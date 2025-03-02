"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { db } from "@/lib/db";

async function getLatestNotices() {
  try {
    const notices = await db.notice.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    return notices;
  } catch (error) {
    console.error("Failed to fetch notices:", error);
    return [];
  }
}

export default async function Hero() {
  const notices: any = await getLatestNotices();
  const emptyNotice = useState([]);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-auto w-auto">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1986&q=80"
          alt="Itahar Government Polytechnic"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Itahar Government Polytechnic
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Empowering students with quality technical education and skills
              for a brighter future
            </p>
          </div>
        </div>
      </section>

      {/* Important Notices Section */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Important Notices</h2>
          <Link href="/notices">
            <Button variant="outline" className="gap-2">
              See All Notices <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notices.length > 0 ? (
            notices.map((notice: any) => (
              <Card key={notice.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{notice.title}</CardTitle>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#318CE7] text-white">
                      {notice.label}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {notice.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(notice.createdAt), "PPP p")}
                    </span>
                    {notice.fileLink && (
                      <Link
                        href={notice.fileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto text-[#318CE7]"
                        >
                          View Full Notice
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-12">
              No notices available at the moment.
            </p>
          )}

          {isSignedIn && emptyNotice && (
            <Link
              href="/admin"
              className="col-span-full text-center text-muted-foreground "
            >
              + Add new Notice
            </Link>
          )}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-muted py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6">Quick Links</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Admissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn about our admission process, eligibility criteria, and
                  important dates.
                </p>
                <Link href="/admissions">
                  <Button className="w-full bg-[#318CE7] hover:bg-[#318CE7]/90">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore our various departments and the courses they offer.
                </p>
                <Link href="/departments">
                  <Button className="w-full bg-[#318CE7] hover:bg-[#318CE7]/90">
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Campus Life</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover the vibrant campus life, facilities, and activities
                  at our institution.
                </p>
                <Link href="/campus">
                  <Button className="w-full bg-[#318CE7] hover:bg-[#318CE7]/90">
                    Discover
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
