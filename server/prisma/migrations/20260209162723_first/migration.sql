/*
  Warnings:

  - You are about to drop the column `categoryTranslationsId` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `colorTranslationsId` on the `Colors` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Colors` table. All the data in the column will be lost.
  - You are about to drop the column `productTranslationsId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Sizes` table. All the data in the column will be lost.
  - You are about to drop the column `sizeTranslationsId` on the `Sizes` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `CategoryTranslations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorId` to the `ColorTranslations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductTranslations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeId` to the `SizeTranslations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_categoryTranslationsId_fkey";

-- DropForeignKey
ALTER TABLE "Colors" DROP CONSTRAINT "Colors_colorTranslationsId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_productTranslationsId_fkey";

-- DropForeignKey
ALTER TABLE "Sizes" DROP CONSTRAINT "Sizes_sizeTranslationsId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "categoryTranslationsId";

-- AlterTable
ALTER TABLE "CategoryTranslations" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ColorTranslations" ADD COLUMN     "colorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Colors" DROP COLUMN "colorTranslationsId",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "ProductTranslations" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "productTranslationsId";

-- AlterTable
ALTER TABLE "SizeTranslations" ADD COLUMN     "sizeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sizes" DROP COLUMN "name",
DROP COLUMN "sizeTranslationsId";

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductTranslations" ADD CONSTRAINT "ProductTranslations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslations" ADD CONSTRAINT "CategoryTranslations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeTranslations" ADD CONSTRAINT "SizeTranslations_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorTranslations" ADD CONSTRAINT "ColorTranslations_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
