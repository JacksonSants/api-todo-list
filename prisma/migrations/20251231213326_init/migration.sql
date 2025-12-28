-- CreateTable
CREATE TABLE "tarefa" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);
