
import MainLayout from "@/components/layout/MainLayout";

export default function Inventory() {
  return (
    <MainLayout title="Inventory & Purchasing">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Inventory & Purchasing</h2>
        <p className="text-muted-foreground">
          This page will include stock management, automated reordering, vendor management, and cost analysis.
        </p>
      </div>
    </MainLayout>
  );
}
