-- CreateTable
CREATE TABLE "Invited" (
    "invitedId" TEXT NOT NULL,
    "invitedById" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Invited_pkey" PRIMARY KEY ("invitedId","invitedById")
);

-- AddForeignKey
ALTER TABLE "Invited" ADD CONSTRAINT "Invited_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invited" ADD CONSTRAINT "Invited_invitedId_fkey" FOREIGN KEY ("invitedId") REFERENCES "User"("idIntra") ON DELETE RESTRICT ON UPDATE CASCADE;
