
import { CalendarDays, Check, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample data for recent bookings
const recentBookings = [
  {
    id: "B-7829",
    guest: {
      name: "Emma Thompson",
      email: "emma.t@example.com",
      avatar: "ET",
    },
    room: "302",
    checkIn: "Apr 28, 2025",
    checkOut: "May 2, 2025",
    status: "Confirmed",
    amount: 1245.99,
    source: "Direct",
  },
  {
    id: "B-7830",
    guest: {
      name: "Robert Chen",
      email: "robert.c@example.com",
      avatar: "RC",
    },
    room: "218",
    checkIn: "Apr 29, 2025",
    checkOut: "Apr 30, 2025",
    status: "Pending",
    amount: 349.50,
    source: "Booking.com",
  },
  {
    id: "B-7831",
    guest: {
      name: "Sarah Miller",
      email: "sarah.m@example.com",
      avatar: "SM",
    },
    room: "105",
    checkIn: "Apr 30, 2025",
    checkOut: "May 5, 2025",
    status: "Confirmed",
    amount: 1650.00,
    source: "Direct",
  },
  {
    id: "B-7832",
    guest: {
      name: "Michael Davis",
      email: "michael.d@example.com",
      avatar: "MD",
    },
    room: "401",
    checkIn: "May 1, 2025",
    checkOut: "May 3, 2025",
    status: "Pending",
    amount: 789.00,
    source: "Expedia",
  },
];

export default function RecentBookings() {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Bookings</CardTitle>
        <Button variant="outline" size="sm" className="h-8 text-xs">
          <CalendarDays className="mr-1 h-4 w-4" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Check-in / Check-out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">
                        {booking.guest.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                      <div className="font-medium">{booking.guest.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {booking.guest.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{booking.room}</TableCell>
                <TableCell>
                  <div className="grid gap-0.5">
                    <div className="font-medium">{booking.checkIn}</div>
                    <div className="text-xs text-muted-foreground">
                      {booking.checkOut}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      booking.status === "Confirmed"
                        ? "text-green-600 bg-green-50 hover:bg-green-50 border-green-200"
                        : "text-amber-600 bg-amber-50 hover:bg-amber-50 border-amber-200"
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  ${booking.amount.toFixed(2)}
                </TableCell>
                <TableCell>{booking.source}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {booking.status === "Pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-green-600 border-green-200"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-red-600 border-red-200"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {booking.status === "Confirmed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                      >
                        Details
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
