/*
  Warnings:

  - You are about to drop the column `revenueCategoryId` on the `expenses` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "expenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "expense_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_expenses" ("amount", "categoryId", "createdAt", "date", "id", "updateAt", "userId") SELECT "amount", "categoryId", "createdAt", "date", "id", "updateAt", "userId" FROM "expenses";
DROP TABLE "expenses";
ALTER TABLE "new_expenses" RENAME TO "expenses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
