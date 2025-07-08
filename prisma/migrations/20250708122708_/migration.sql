/*
  Warnings:

  - You are about to drop the column `unionid` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_unionid_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `unionid`,
    MODIFY `avatar` VARCHAR(191) NULL DEFAULT '/uploads/default.jpg',
    MODIFY `role` VARCHAR(191) NULL DEFAULT 'user';
