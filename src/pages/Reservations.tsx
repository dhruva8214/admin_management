
import { useState } from "react";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingCalendar } from "@/components/reservations/BookingCalendar";
import { ReservationForm } from "@/components/reservations/ReservationForm";
import { ReservationList, Reservation } from "@/components/reservations/ReservationList";
import { GroupBookings } from "@/components/reservations/GroupBookings";
import { RatePlans } from "@/components/reservations/RatePlans";
import { CalendarDays, ListTodo, UserPlus, BarChart2 } from "lucide-react";

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      guestName: "Alex Johnson",
      email: "alex@example.com",
      phone: "555-123-4567",
      roomType: "Suite",
      checkIn: new Date(2025, 3, 30),
      checkOut: new Date(2025, 4, 5),
      guests: 2,
      status: "confirmed",
    },
    {
      id: "2",
      guestName: "Sarah Parker",
      email: "sarah@example.com",
      phone: "555-987-6543",
      roomType: "Deluxe",
      checkIn: new Date(2025, 4, 1),
      checkOut: new Date(2025, 4, 3),
      guests: 1,
      status: "checked-in",
    },
  ]);

  const handleAddReservation = (newReservation: {
    guestName: string;
    email: string;
    phone: string;
    roomType: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
  }) => {
    const reservation: Reservation = {
      id: String(Date.now()),
      ...newReservation,
      status: "confirmed",
    };
    setReservations([...reservations, reservation]);
    toast.success("Reservation created successfully", {
      description: `${reservation.guestName} booked from ${reservation.checkIn.toLocaleDateString()} to ${reservation.checkOut.toLocaleDateString()}`
    });
  };

  const handleCancelReservation = (id: string) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: "cancelled" as const } : res
      )
    );
    toast.info("Reservation cancelled");
  };

  const handleCheckIn = (id: string) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: "checked-in" as const } : res
      )
    );
    toast.success("Guest checked in successfully");
  };

  const handleCheckOut = (id: string) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: "checked-out" as const } : res
      )
    );
    toast.success("Guest checked out successfully");
  };

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
                reservations={reservations}
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
