/*
  Warnings:

  - The primary key for the `toadz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `owner_id` on the `toadz` table. All the data in the column will be lost.
  - You are about to drop the column `spirit` on the `toadz` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `toadz` table. All the data in the column will be lost.
  - You are about to drop the column `toad_id` on the `toadz` table. All the data in the column will be lost.
  - You are about to drop the column `toad_name` on the `toadz` table. All the data in the column will be lost.
  - Added the required column `toadId` to the `Toadz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `toadz` DROP PRIMARY KEY,
    DROP COLUMN `owner_id`,
    DROP COLUMN `spirit`,
    DROP COLUMN `state`,
    DROP COLUMN `toad_id`,
    DROP COLUMN `toad_name`,
    ADD COLUMN `toadId` INTEGER NOT NULL,
    ADD COLUMN `toadName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `userId` VARCHAR(191) NULL,
    MODIFY `health` INTEGER NOT NULL DEFAULT 10,
    MODIFY `happiness` INTEGER NOT NULL DEFAULT 10,
    MODIFY `energy` INTEGER NOT NULL DEFAULT 10,
    MODIFY `fed` INTEGER NOT NULL DEFAULT 10,
    MODIFY `overall` INTEGER NOT NULL DEFAULT 10,
    ADD PRIMARY KEY (`toadId`);

-- CreateTable
CREATE TABLE `User` (
    `address` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,

    PRIMARY KEY (`address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Toadz` ADD CONSTRAINT `Toadz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`address`) ON DELETE SET NULL ON UPDATE CASCADE;
