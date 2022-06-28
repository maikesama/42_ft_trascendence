/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idIntra]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idIntra` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "idIntra" TEXT NOT NULL,
ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "tel" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "userName" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "User_idIntra_key" ON "User"("idIntra");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
