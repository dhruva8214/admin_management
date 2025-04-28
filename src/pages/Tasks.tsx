
import MainLayout from "@/components/layout/MainLayout";

export default function Tasks() {
  return (
    <MainLayout title="Task Management">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Task Management</h2>
        <p className="text-muted-foreground">
          This page will include a comprehensive task management system for all departments, with priority levels, assignments, and tracking.
        </p>
      </div>
    </MainLayout>
  );
}
