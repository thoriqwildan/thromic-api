/*
  Warnings:

  - The primary key for the `artists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `authors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `artist_name` on the `series` table. All the data in the column will be lost.
  - You are about to drop the column `author_name` on the `series` table. All the data in the column will be lost.
  - You are about to drop the column `genre_name` on the `series` table. All the data in the column will be lost.
  - Added the required column `id` to the `artists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `authors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `genres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artist_id` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre_id` to the `series` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `series` DROP FOREIGN KEY `series_artist_name_fkey`;

-- DropForeignKey
ALTER TABLE `series` DROP FOREIGN KEY `series_author_name_fkey`;

-- DropForeignKey
ALTER TABLE `series` DROP FOREIGN KEY `series_genre_name_fkey`;

-- DropIndex
DROP INDEX `series_artist_name_fkey` ON `series`;

-- DropIndex
DROP INDEX `series_author_name_fkey` ON `series`;

-- DropIndex
DROP INDEX `series_genre_name_fkey` ON `series`;

-- AlterTable
ALTER TABLE `artists` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `authors` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `genres` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `series` DROP COLUMN `artist_name`,
    DROP COLUMN `author_name`,
    DROP COLUMN `genre_name`,
    ADD COLUMN `artist_id` INTEGER NOT NULL,
    ADD COLUMN `author_id` INTEGER NOT NULL,
    ADD COLUMN `genre_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `series` ADD CONSTRAINT `series_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series` ADD CONSTRAINT `series_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `series` ADD CONSTRAINT `series_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `genres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
