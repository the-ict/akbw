/*
  Warnings:

  - Added the required column `coupon_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "coupon_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "Coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
