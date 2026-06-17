import { BottomNav } from "@/components/tow-usa/bottom-nav";
import { MobileShell } from "@/components/tow-usa/shared";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileShell>
      {children}
      <BottomNav />
    </MobileShell>
  );
}
