/*
  Warnings:

  - You are about to drop the column `name` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "name",
ADD COLUMN     "categoryTranslationsId" INTEGER;

-- AlterTable
ALTER TABLE "Colors" ADD COLUMN     "colorTranslationsId" INTEGER;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "name",
ADD COLUMN     "productTranslationsId" INTEGER;

-- AlterTable
ALTER TABLE "Sizes" ADD COLUMN     "sizeTranslationsId" INTEGER;

-- CreateTable
CREATE TABLE "ProductTranslations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTranslations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeTranslations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SizeTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorTranslations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ColorTranslations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productTranslationsId_fkey" FOREIGN KEY ("productTranslationsId") REFERENCES "ProductTranslations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_categoryTranslationsId_fkey" FOREIGN KEY ("categoryTranslationsId") REFERENCES "CategoryTranslations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sizes" ADD CONSTRAINT "Sizes_sizeTranslationsId_fkey" FOREIGN KEY ("sizeTranslationsId") REFERENCES "SizeTranslations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colors" ADD CONSTRAINT "Colors_colorTranslationsId_fkey" FOREIGN KEY ("colorTranslationsId") REFERENCES "ColorTranslations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
