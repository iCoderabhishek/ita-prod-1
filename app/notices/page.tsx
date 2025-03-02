import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

async function getAllNotices() {
  try {
    const notices = await db.notice.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return notices;
  } catch (error) {
    console.error("Failed to fetch notices:", error);
    return [];
  }
}

export default async function NoticesPage() {
  const notices = await getAllNotices();

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">All Notices</h1>

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
                <p className="text-sm text-muted-foreground mb-4">
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
      </div>
    </div>
  );
}
