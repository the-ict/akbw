/*
  Warnings:

  - Added the required column `user_id` to the `AskForChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `HelpChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AskForChat" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HelpChat" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "HelpChat" ADD CONSTRAINT "HelpChat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AskForChat" ADD CONSTRAINT "AskForChat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
