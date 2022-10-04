/*
  Warnings:

  - The primary key for the `Chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idIntra` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_idIntra_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_idChat_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_idIntra_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_pkey",
DROP COLUMN "idIntra";

-- DropTable
DROP TABLE "Participant";

-- CreateTable
CREATE TABLE "Partecipant" (
    "idIntra" TEXT NOT NULL,
    "idChat" INTEGER NOT NULL,
    "muted" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mutedAt" TIMESTAMP(3),
    "bannedAt" TIMESTAMP(3),
    "adminAt" TIMESTAMP(3),

    CONSTRAINT "Partecipant_pkey" PRIMARY KEY ("idIntra","idChat")
);

-- AddForeignKey
ALTER TABLE "Partecipant" ADD CONSTRAINT "Partecipant_idIntra_fkey" FOREIGN KEY ("idIntra") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partecipant" ADD CONSTRAINT "Partecipant_idChat_fkey" FOREIGN KEY ("idChat") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
