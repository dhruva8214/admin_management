
import MainLayout from "@/components/layout/MainLayout";

export default function Property() {
  return (
    <MainLayout title="Property Management">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Property Management</h2>
        <p className="text-muted-foreground">
          This page will include room inventory management, room status tracking, maintenance requests, and property configuration.
        </p>
      </div>
    </MainLayout>
  );
}
