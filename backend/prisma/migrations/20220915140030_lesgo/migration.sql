-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "idIntra" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "tel" TEXT NOT NULL DEFAULT '',
    "img" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "twoFa" BOOLEAN NOT NULL DEFAULT false,
    "otpSecret" TEXT NOT NULL DEFAULT '',
    "otpUrl" TEXT NOT NULL DEFAULT '',
    "win" INTEGER NOT NULL DEFAULT 0,
    "loss" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 1000,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "friendId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Blocklist" (
    "blockId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,

    CONSTRAINT "Blocklist_pkey" PRIMARY KEY ("blockId","blockedId")
);

-- CreateTable
CREATE TABLE "Games" (
    "idGame" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "user1" TEXT NOT NULL,
    "user2" TEXT NOT NULL,
    "scoreP1" INTEGER NOT NULL DEFAULT 0,
    "scoreP2" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "winner" TEXT,
    "loser" TEXT,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("idGame")
);

-- CreateTable
CREATE TABLE "Participant" (
    "idIntra" TEXT NOT NULL,
    "idChat" INTEGER NOT NULL,
    "muted" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mutedAt" TIMESTAMP(3),
    "bannedAt" TIMESTAMP(3),
    "adminAt" TIMESTAMP(3),

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("idIntra","idChat")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idIntra" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'public',
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("name","idIntra")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "idChat" INTEGER NOT NULL,
    "idIntra" TEXT NOT NULL,
    "sendedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_idIntra_key" ON "User"("idIntra");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Friends_friendId_key" ON "Friends"("friendId");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_id_key" ON "Chat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocklist" ADD CONSTRAINT "Blocklist_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocklist" ADD CONSTRAINT "Blocklist_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_idIntra_fkey" FOREIGN KEY ("idIntra") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_idChat_fkey" FOREIGN KEY ("idChat") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_idIntra_fkey" FOREIGN KEY ("idIntra") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_idIntra_fkey" FOREIGN KEY ("idIntra") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_idChat_fkey" FOREIGN KEY ("idChat") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
