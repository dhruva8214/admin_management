
import MainLayout from "@/components/layout/MainLayout";

export default function Staff() {
  return (
    <MainLayout title="Staff Management">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Staff Management</h2>
        <p className="text-muted-foreground">
          This page will include employee scheduling, task assignments, department dashboards, and performance analytics.
        </p>
      </div>
    </MainLayout>
  );
}
