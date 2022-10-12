/*
  Warnings:

  - You are about to drop the column `adminAt` on the `Partecipant` table. All the data in the column will be lost.
  - You are about to drop the column `banned` on the `Partecipant` table. All the data in the column will be lost.
  - You are about to drop the column `bannedTime` on the `Partecipant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Partecipant" DROP COLUMN "adminAt",
DROP COLUMN "banned",
DROP COLUMN "bannedTime",
ADD COLUMN     "bannedUntil" TIMESTAMP(3);
