-- AlterTable
ALTER TABLE "User" ADD COLUMN     "achAce" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "achFirstWin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "achFiveinRow" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "achRealLoser" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "achTeninRow" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "achTwentyinRow" BOOLEAN NOT NULL DEFAULT false;