/*
  Warnings:

  - Added the required column `addColumnTest` to the `Toad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `toad` ADD COLUMN `addColumnTest` VARCHAR(191) NOT NULL;
