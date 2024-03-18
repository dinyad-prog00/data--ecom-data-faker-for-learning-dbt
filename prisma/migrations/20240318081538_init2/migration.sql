-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_manager_id_fkey";

-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "manager_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
