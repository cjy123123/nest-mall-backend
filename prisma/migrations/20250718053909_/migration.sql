/*
  Warnings:

  - You are about to drop the column `discountPrice` on the `Goods` table. All the data in the column will be lost.
  - You are about to drop the column `isDiscount` on the `Goods` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Goods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Goods` DROP COLUMN `discountPrice`,
    DROP COLUMN `isDiscount`,
    DROP COLUMN `status`,
    ADD COLUMN `isOnSale` BOOLEAN NOT NULL DEFAULT true;
