/*
  Warnings:

  - You are about to drop the `_artiststoseries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_authorstoseries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_genrestoseries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_artiststoseries` DROP FOREIGN KEY `_ArtistsToSeries_A_fkey`;

-- DropForeignKey
ALTER TABLE `_artiststoseries` DROP FOREIGN KEY `_ArtistsToSeries_B_fkey`;

-- DropForeignKey
ALTER TABLE `_authorstoseries` DROP FOREIGN KEY `_AuthorsToSeries_A_fkey`;

-- DropForeignKey
ALTER TABLE `_authorstoseries` DROP FOREIGN KEY `_AuthorsToSeries_B_fkey`;

-- DropForeignKey
ALTER TABLE `_genrestoseries` DROP FOREIGN KEY `_GenresToSeries_A_fkey`;

-- DropForeignKey
ALTER TABLE `_genrestoseries` DROP FOREIGN KEY `_GenresToSeries_B_fkey`;

-- AlterTable
ALTER TABLE `series` MODIFY `cover_img` VARCHAR(255) NOT NULL DEFAULT '/uploads/cover/index.png';

-- DropTable
DROP TABLE `_artiststoseries`;

-- DropTable
DROP TABLE `_authorstoseries`;

-- DropTable
DROP TABLE `_genrestoseries`;

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
ALTER TABLE `AuthorSeries` ADD CONSTRAINT `AuthorSeries_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorSeries` ADD CONSTRAINT `AuthorSeries_series_id_fkey` FOREIGN KEY (`series_id`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistSeries` ADD CONSTRAINT `ArtistSeries_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistSeries` ADD CONSTRAINT `ArtistSeries_series_id_fkey` FOREIGN KEY (`series_id`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenreSeries` ADD CONSTRAINT `GenreSeries_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenreSeries` ADD CONSTRAINT `GenreSeries_series_id_fkey` FOREIGN KEY (`series_id`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
