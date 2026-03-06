-- CreateTable
CREATE TABLE "monthly_attendance_summaries" (
    "member_id" TEXT NOT NULL,
    "target_month" CHAR(7) NOT NULL,
    "work_days" INTEGER NOT NULL DEFAULT 0,
    "total_minutes" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monthly_attendance_summaries_pkey" PRIMARY KEY ("member_id","target_month")
);

-- CreateIndex
CREATE INDEX "monthly_attendance_summaries_target_month_idx" ON "monthly_attendance_summaries"("target_month");

-- AddForeignKey
ALTER TABLE "monthly_attendance_summaries" ADD CONSTRAINT "monthly_attendance_summaries_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
