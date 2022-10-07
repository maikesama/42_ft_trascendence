/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "invited" TEXT[];

-- AlterTable
ALTER TABLE "Partecipant" ADD COLUMN     "bannedTime" TIMESTAMP(3),
ADD COLUMN     "mutedUntil" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_name_key" ON "Chat"("name");
