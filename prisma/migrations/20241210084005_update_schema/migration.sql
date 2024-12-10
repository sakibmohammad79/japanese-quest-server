/*
  Warnings:

  - Added the required column `title` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Tutorial" ADD COLUMN     "title" TEXT NOT NULL;
