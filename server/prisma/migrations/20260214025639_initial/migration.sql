-- DropForeignKey
ALTER TABLE "AskForChatMessages" DROP CONSTRAINT "AskForChatMessages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "HelpChatMessages" DROP CONSTRAINT "HelpChatMessages_sender_id_fkey";

-- AlterTable
ALTER TABLE "Admins" ALTER COLUMN "role" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AskForChatMessages" ADD COLUMN     "admin_id" INTEGER,
ALTER COLUMN "sender_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "parentId" INTEGER;

-- AlterTable
ALTER TABLE "HelpChatMessages" ADD COLUMN     "admin_id" INTEGER,
ALTER COLUMN "sender_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Styles" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Styles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Styles" ADD CONSTRAINT "Styles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpChatMessages" ADD CONSTRAINT "HelpChatMessages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpChatMessages" ADD CONSTRAINT "HelpChatMessages_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AskForChatMessages" ADD CONSTRAINT "AskForChatMessages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AskForChatMessages" ADD CONSTRAINT "AskForChatMessages_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
