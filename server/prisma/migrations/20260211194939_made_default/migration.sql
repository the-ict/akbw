-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_coupon_id_fkey";

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "coupon_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "Coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
