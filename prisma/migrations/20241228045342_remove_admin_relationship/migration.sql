/*
  Warnings:

  - You are about to drop the column `adminID` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_adminID_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "adminID";
