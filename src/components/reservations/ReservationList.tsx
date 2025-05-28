
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarClock, UserCheck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Reservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
}

interface ReservationListProps {
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
}

export function ReservationList({
  reservations,
  onCancelReservation,
  onCheckIn,
  onCheckOut,
}: ReservationListProps) {
  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case "checked-in":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Checked In</Badge>;
      case "checked-out":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Checked Out</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return null;
    }
  };

  if (reservations.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">No Reservations Yet</h3>
        <p className="text-muted-foreground">Create a new reservation to get started.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Reservation ID</TableHead>
              <TableHead className="font-semibold">Guest Details</TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Room & Guests</TableHead>
              <TableHead className="font-semibold">Stay Period</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id} className="hover:bg-muted/20">
                <TableCell>
                  <div className="font-mono text-sm font-medium">
                    #{reservation.id.slice(-6)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-base">{reservation.guestName}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{reservation.email}</div>
                    <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{reservation.roomType}</div>
                    <div className="text-sm text-muted-foreground">
                      {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">
                      {format(new Date(reservation.checkIn), "MMM dd, yyyy")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      to {format(new Date(reservation.checkOut), "MMM dd, yyyy")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.ceil((new Date(reservation.checkOut).getTime() - new Date(reservation.checkIn).getTime()) / (1000 * 3600 * 24))} nights
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(reservation.status)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {reservation.status === "confirmed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCheckIn(reservation.id)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <CalendarClock className="h-4 w-4 mr-1" />
                        Check In
                      </Button>
                    )}
                    {reservation.status === "checked-in" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCheckOut(reservation.id)}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Check Out
                      </Button>
                    )}
                    {(reservation.status === "confirmed" || reservation.status === "checked-in") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCancelReservation(reservation.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
