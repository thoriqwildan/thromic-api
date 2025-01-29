/*
  Warnings:

  - You are about to drop the `types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `types`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `imgUrl` VARCHAR(255) NOT NULL DEFAULT 'http://localhost/uploads/profiles/index.png',
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `series` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `series_name` VARCHAR(100) NOT NULL,
    `cover_img` VARCHAR(255) NOT NULL DEFAULT 'http://localhost/uploads/cover/index.png',
    `description` VARCHAR(191) NOT NULL,
    `release` VARCHAR(100) NOT NULL,
    `author_name` VARCHAR(50) NOT NULL,
    `artist_name` VARCHAR(50) NOT NULL,
    `genre_name` VARCHAR(50) NOT NULL,
    `type_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `series` ADD CONSTRAINT `series_author_name_fkey` FOREIGN KEY (`author_name`) REFERENCES `authors`(`author_name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series` ADD CONSTRAINT `series_artist_name_fkey` FOREIGN KEY (`artist_name`) REFERENCES `artists`(`artist_name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series` ADD CONSTRAINT `series_genre_name_fkey` FOREIGN KEY (`genre_name`) REFERENCES `genres`(`genre_name`) ON DELETE RESTRICT ON UPDATE CASCADE;
