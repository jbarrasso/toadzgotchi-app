/*
  Warnings:

  - You are about to drop the column `fitness` on the `toadz` table. All the data in the column will be lost.
  - You are about to drop the column `fulfillment` on the `toadz` table. All the data in the column will be lost.
  - You are about to drop the column `full` on the `toadz` table. All the data in the column will be lost.
  - You are about to drop the column `rest` on the `toadz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `toadz` DROP COLUMN `fitness`,
    DROP COLUMN `fulfillment`,
    DROP COLUMN `full`,
    DROP COLUMN `rest`,
    ADD COLUMN `energy` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fed` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `overall` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `spirit` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `state` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `vibing` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `toad_name` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `owner_id` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `level` INTEGER NOT NULL DEFAULT 0,
    MODIFY `xp` INTEGER NOT NULL DEFAULT 0,
    MODIFY `health` INTEGER NOT NULL DEFAULT 0,
    MODIFY `happiness` INTEGER NOT NULL DEFAULT 0;
