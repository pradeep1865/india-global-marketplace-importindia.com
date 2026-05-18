import { AppShell } from "@/components/AppShell";
import { ManufacturerVerificationQueue } from "@/components/AdminQueues";

export default function AdminManufacturersPage() {
  return (
    <AppShell>
      <ManufacturerVerificationQueue />
    </AppShell>
  );
}
