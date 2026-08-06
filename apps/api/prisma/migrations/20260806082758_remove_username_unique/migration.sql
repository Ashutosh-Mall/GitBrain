-- DropIndex
DROP INDEX "User_githubUsername_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "githubUsername" SET DATA TYPE TEXT;
