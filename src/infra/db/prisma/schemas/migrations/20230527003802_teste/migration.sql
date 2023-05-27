/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `expense_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "expense_categories_id_key" ON "expense_categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
