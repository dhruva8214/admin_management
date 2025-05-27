
import MainLayout from "@/components/layout/MainLayout";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingCalendar } from "@/components/reservations/BookingCalendar";
import { ReservationForm } from "@/components/reservations/ReservationForm";
import { ReservationList } from "@/components/reservations/ReservationList";
import { GroupBookings } from "@/components/reservations/GroupBookings";
import { RatePlans } from "@/components/reservations/RatePlans";
import { CalendarDays, ListTodo, UserPlus, BarChart2 } from "lucide-react";
import { useReservations } from "@/hooks/useReservations";
import { Skeleton } from "@/components/ui/skeleton";

export default function Reservations() {
  const { reservations, loading, addReservation, updateReservationStatus } = useReservations();

  const handleAddReservation = (newReservation: {
    guestName: string;
    email: string;
    phone: string;
    roomType: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
  }) => {
    addReservation({
      guest_name: newReservation.guestName,
      email: newReservation.email,
      phone: newReservation.phone,
      room_type: newReservation.roomType,
      check_in_date: newReservation.checkIn,
      check_out_date: newReservation.checkOut,
      guests: newReservation.guests,
    });
    toast.success("Reservation created successfully", {
      description: `${newReservation.guestName} booked from ${newReservation.checkIn.toLocaleDateString()} to ${newReservation.checkOut.toLocaleDateString()}`
    });
  };

  const handleCancelReservation = (id: string) => {
    updateReservationStatus(id, "cancelled");
    toast.info("Reservation cancelled");
  };

  const handleCheckIn = (id: string) => {
    updateReservationStatus(id, "checked-in");
    toast.success("Guest checked in successfully");
  };

  const handleCheckOut = (id: string) => {
    updateReservationStatus(id, "checked-out");
    toast.success("Guest checked out successfully");
  };

  // Convert reservations to match ReservationList component interface
  const convertedReservations = reservations.map(reservation => ({
    id: reservation.id,
    guestName: reservation.guest_name,
    email: reservation.email,
    phone: reservation.phone,
    roomType: reservation.room_type,
    checkIn: reservation.check_in_date,
    checkOut: reservation.check_out_date,
    guests: reservation.guests,
    status: reservation.status
  }));

  if (loading) {
    return (
      <MainLayout title="Reservations">
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Reservations">
      <div className="space-y-6">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar" className="flex gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="reservations" className="flex gap-2">
              <ListTodo className="h-4 w-4" />
              <span>Reservations</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Group Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="rates" className="flex gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Rate Plans</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BookingCalendar />
              </div>
              <div>
                <ReservationForm onSubmit={handleAddReservation} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reservations" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Manage Reservations</h2>
              <ReservationList
                reservations={convertedReservations}
                onCancelReservation={handleCancelReservation}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Group Bookings</h2>
              <GroupBookings />
            </div>
          </TabsContent>
          
          <TabsContent value="rates" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Rate Plans</h2>
              <RatePlans />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
