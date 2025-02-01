/*
  Warnings:

  - You are about to drop the column `artist_id` on the `series` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `series` table. All the data in the column will be lost.
  - You are about to drop the column `genre_id` on the `series` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `series` DROP FOREIGN KEY `series_artist_id_fkey`;

-- DropForeignKey
ALTER TABLE `series` DROP FOREIGN KEY `series_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `series` DROP FOREIGN KEY `series_genre_id_fkey`;

-- DropIndex
DROP INDEX `series_artist_id_fkey` ON `series`;

-- DropIndex
DROP INDEX `series_author_id_fkey` ON `series`;

-- DropIndex
DROP INDEX `series_genre_id_fkey` ON `series`;

-- AlterTable
ALTER TABLE `series` DROP COLUMN `artist_id`,
    DROP COLUMN `author_id`,
    DROP COLUMN `genre_id`;

-- CreateTable
CREATE TABLE `AuthorSeries` (
    `author_id` INTEGER NOT NULL,
    `series_id` INTEGER NOT NULL,

    PRIMARY KEY (`author_id`, `series_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistSeries` (
    `artist_id` INTEGER NOT NULL,
    `series_id` INTEGER NOT NULL,

    PRIMARY KEY (`artist_id`, `series_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GenreSeries` (
    `genre_id` INTEGER NOT NULL,
    `series_id` INTEGER NOT NULL,

    PRIMARY KEY (`genre_id`, `series_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuthorSeries` ADD CONSTRAINT `AuthorSeries_series_id_fkey` FOREIGN KEY (`series_id`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorSeries` ADD CONSTRAINT `AuthorSeries_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistSeries` ADD CONSTRAINT `ArtistSeries_series_id_fkey` FOREIGN KEY (`series_id`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistSeries` ADD CONSTRAINT `ArtistSeries_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenreSeries` ADD CONSTRAINT `GenreSeries_series_id_fkey` FOREIGN KEY (`series_id`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenreSeries` ADD CONSTRAINT `GenreSeries_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
