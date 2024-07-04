/*
  Warnings:

  - Made the column `imageUrl` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "imageUrl" SET NOT NULL;
