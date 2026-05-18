import { AppShell } from "@/components/AppShell";
import { ProductModerationQueue } from "@/components/AdminQueues";

export default function AdminModerationPage() {
  return (
    <AppShell>
      <ProductModerationQueue />
    </AppShell>
  );
}
