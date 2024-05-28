-- CreateTable
CREATE TABLE "CheckIn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attende_id" INTEGER NOT NULL,
    CONSTRAINT "CheckIn_attende_id_fkey" FOREIGN KEY ("attende_id") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_attende_id_key" ON "CheckIn"("attende_id");
