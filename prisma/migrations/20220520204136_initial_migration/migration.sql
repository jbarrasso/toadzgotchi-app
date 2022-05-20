-- CreateTable
CREATE TABLE `Toadz` (
    `toadId` INTEGER NOT NULL,
    `toadName` VARCHAR(191) NOT NULL DEFAULT '',
    `userId` VARCHAR(191) NULL,
    `vibing` BOOLEAN NOT NULL DEFAULT false,
    `level` INTEGER NOT NULL DEFAULT 0,
    `xp` INTEGER NOT NULL DEFAULT 0,
    `overall` INTEGER NOT NULL DEFAULT 5,
    `fed` INTEGER NOT NULL DEFAULT 5,
    `energy` INTEGER NOT NULL DEFAULT 5,
    `happiness` INTEGER NOT NULL DEFAULT 5,
    `health` INTEGER NOT NULL DEFAULT 5,
    `vibeStart` VARCHAR(191) NOT NULL,
    `lastDecay` VARCHAR(191) NOT NULL,

    INDEX `Toadz_userId_idx`(`userId`),
    PRIMARY KEY (`toadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `address` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,
    `points` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
