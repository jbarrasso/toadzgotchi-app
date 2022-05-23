-- CreateTable
CREATE TABLE `Toad` (
    `toad_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
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
