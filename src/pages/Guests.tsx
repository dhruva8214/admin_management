
import MainLayout from "@/components/layout/MainLayout";

export default function Guests() {
  return (
    <MainLayout title="Guest Management">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Guest Management</h2>
        <p className="text-muted-foreground">
          This page will include guest profiles, check-in/check-out processes, guest communication tools, and request management.
        </p>
      </div>
    </MainLayout>
  );
}
