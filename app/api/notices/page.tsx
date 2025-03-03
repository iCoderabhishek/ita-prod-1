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
        <p className="col-span-full text-center text-muted-foreground py-12">
          No notices available at the moment.
        </p>
      </div>
    </div>
  );
}
