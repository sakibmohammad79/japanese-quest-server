/*
  Warnings:

  - Added the required column `createdById` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "isPublish" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tutorial" ADD COLUMN     "createdById" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tutorial" ADD CONSTRAINT "Tutorial_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
