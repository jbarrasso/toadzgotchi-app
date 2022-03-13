/*
  Warnings:

  - You are about to drop the `toad` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `toad`;

-- CreateTable
CREATE TABLE `Toadz` (
    `toad_id` INTEGER NOT NULL,
    `toad_name` VARCHAR(191) NOT NULL,
    `owner_id` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `xp` INTEGER NOT NULL,
    `health` INTEGER NOT NULL,
    `full` INTEGER NOT NULL,
    `rest` INTEGER NOT NULL,
    `happiness` INTEGER NOT NULL,
    `fitness` INTEGER NOT NULL,
    `fulfillment` INTEGER NOT NULL,

    PRIMARY KEY (`toad_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
