/*
  Warnings:

  - You are about to drop the column `fileLink` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the `Visit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fullNoticeLink` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `label` on the `Notice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Label" AS ENUM ('EXAM', 'ADMISSION', 'FACULTY', 'STUDENTS', 'SPORTS', 'COLLEGE');

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "fileLink",
DROP COLUMN "updatedAt",
ADD COLUMN     "fullNoticeLink" TEXT NOT NULL,
DROP COLUMN "label",
ADD COLUMN     "label" "Label" NOT NULL;

-- DropTable
DROP TABLE "Visit";

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "userVisits" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_clerkId_key" ON "Admin"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_month_key" ON "Analytics"("month");
