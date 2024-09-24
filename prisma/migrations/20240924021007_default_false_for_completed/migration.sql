-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_tarefa" ("completed", "dateTime", "description", "id", "title") SELECT "completed", "dateTime", "description", "id", "title" FROM "tarefa";
DROP TABLE "tarefa";
ALTER TABLE "new_tarefa" RENAME TO "tarefa";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
