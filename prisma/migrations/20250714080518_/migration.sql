-- DropForeignKey
ALTER TABLE `Receipt` DROP FOREIGN KEY `Receipt_userId_fkey`;

-- DropIndex
DROP INDEX `Category_name_key` ON `Category`;

-- DropIndex
DROP INDEX `Goods_title_key` ON `Goods`;

-- DropIndex
DROP INDEX `Receipt_userId_key` ON `Receipt`;

-- AddForeignKey
ALTER TABLE `Receipt` ADD CONSTRAINT `Receipt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
