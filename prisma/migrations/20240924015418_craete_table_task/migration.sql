-- CreateTable
CREATE TABLE "tarefa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL
);
