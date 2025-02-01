/*
  Warnings:

  - You are about to drop the `artistseries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `authorseries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genreseries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `artistseries` DROP FOREIGN KEY `ArtistSeries_artist_id_fkey`;

-- DropForeignKey
ALTER TABLE `artistseries` DROP FOREIGN KEY `ArtistSeries_series_id_fkey`;

-- DropForeignKey
ALTER TABLE `authorseries` DROP FOREIGN KEY `AuthorSeries_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `authorseries` DROP FOREIGN KEY `AuthorSeries_series_id_fkey`;

-- DropForeignKey
ALTER TABLE `genreseries` DROP FOREIGN KEY `GenreSeries_genre_id_fkey`;

-- DropForeignKey
ALTER TABLE `genreseries` DROP FOREIGN KEY `GenreSeries_series_id_fkey`;

-- DropTable
DROP TABLE `artistseries`;

-- DropTable
DROP TABLE `authorseries`;

-- DropTable
DROP TABLE `genreseries`;

-- CreateTable
CREATE TABLE `_AuthorsToSeries` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AuthorsToSeries_AB_unique`(`A`, `B`),
    INDEX `_AuthorsToSeries_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GenresToSeries` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GenresToSeries_AB_unique`(`A`, `B`),
    INDEX `_GenresToSeries_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArtistsToSeries` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArtistsToSeries_AB_unique`(`A`, `B`),
    INDEX `_ArtistsToSeries_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AuthorsToSeries` ADD CONSTRAINT `_AuthorsToSeries_A_fkey` FOREIGN KEY (`A`) REFERENCES `authors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorsToSeries` ADD CONSTRAINT `_AuthorsToSeries_B_fkey` FOREIGN KEY (`B`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenresToSeries` ADD CONSTRAINT `_GenresToSeries_A_fkey` FOREIGN KEY (`A`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GenresToSeries` ADD CONSTRAINT `_GenresToSeries_B_fkey` FOREIGN KEY (`B`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistsToSeries` ADD CONSTRAINT `_ArtistsToSeries_A_fkey` FOREIGN KEY (`A`) REFERENCES `artists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistsToSeries` ADD CONSTRAINT `_ArtistsToSeries_B_fkey` FOREIGN KEY (`B`) REFERENCES `series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
