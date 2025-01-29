/*
  Warnings:

  - You are about to drop the column `type_name` on the `series` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `series` DROP COLUMN `type_name`,
    ADD COLUMN `type` ENUM('MANHWA', 'MANGA', 'MANHUA') NOT NULL DEFAULT 'MANHWA';
