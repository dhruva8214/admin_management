
import MainLayout from "@/components/layout/MainLayout";

export default function Reservations() {
  return (
    <MainLayout title="Reservations">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Reservation System</h2>
        <p className="text-muted-foreground">
          This page will include an interactive booking calendar, reservation management, group bookings, and rate plans.
        </p>
      </div>
    </MainLayout>
  );
}
