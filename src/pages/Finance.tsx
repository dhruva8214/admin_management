
import MainLayout from "@/components/layout/MainLayout";

export default function Finance() {
  return (
    <MainLayout title="Financial Management">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Financial Management</h2>
        <p className="text-muted-foreground">
          This page will include invoicing, payment processing, revenue management, expense tracking, and financial reporting.
        </p>
      </div>
    </MainLayout>
  );
}
