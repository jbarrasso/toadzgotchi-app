/*
  Warnings:

  - You are about to drop the column `toad_name` on the `toad` table. All the data in the column will be lost.
  - Added the required column `name` to the `Toad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `toad` DROP COLUMN `toad_name`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
