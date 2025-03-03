"use client";

import { useUser } from "@clerk/nextjs";

export default function FirstNameDisplay() {
  const { user } = useUser();

  if (!user) {
    return null; // Or a loading state
  }

  const firstName = user.firstName;

  return (
    <div className=" flex flex-col space-y-2">
      <div className=" border-t-2 rounded">{firstName}</div>
    </div>
  );
}
