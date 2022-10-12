/*
  Warnings:

  - You are about to drop the column `type` on the `Invited` table. All the data in the column will be lost.
  - You are about to drop the column `muted` on the `Partecipant` table. All the data in the column will be lost.
  - You are about to drop the `Friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_friendId_fkey";

-- AlterTable
ALTER TABLE "Games" ALTER COLUMN "status" SET DEFAULT 'waiting',
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Invited" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Partecipant" DROP COLUMN "muted";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "winRow" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Friends";

-- CreateTable
CREATE TABLE "Friend" (
    "friendId" TEXT NOT NULL,
    "friendById" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("friendId","friendById")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendById_fkey" FOREIGN KEY ("friendById") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;
