
import MainLayout from "@/components/layout/MainLayout";

export default function Settings() {
  return (
    <MainLayout title="Settings">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">System Settings</h2>
        <p className="text-muted-foreground">
          This page will include user access control, system configuration, notification settings, and integration management.
        </p>
      </div>
    </MainLayout>
  );
}
