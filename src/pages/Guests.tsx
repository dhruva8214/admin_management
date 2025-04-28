
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'checked-in' | 'checked-out' | 'arriving' | 'departing';
  room: string;
  checkIn: string;
  checkOut: string;
}

const guests: Guest[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 234 567 890',
    status: 'checked-in',
    room: '102',
    checkIn: '2025-04-25',
    checkOut: '2025-04-30'
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    phone: '+1 234 567 891',
    status: 'arriving',
    room: '205',
    checkIn: '2025-04-29',
    checkOut: '2025-05-02'
  }
];

const statusColors = {
  'checked-in': 'bg-green-100 text-green-800 border-green-200',
  'checked-out': 'bg-gray-100 text-gray-800 border-gray-200',
  'arriving': 'bg-blue-100 text-blue-800 border-blue-200',
  'departing': 'bg-amber-100 text-amber-800 border-amber-200'
};

export default function Guests() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.room.includes(searchTerm)
  );

  return (
    <MainLayout title="Guest Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="w-72">
            <Input 
              placeholder="Search guests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>New Guest</Button>
        </div>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">{guest.name}</TableCell>
                  <TableCell>Room {guest.room}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(statusColors[guest.status])}>
                      {guest.status.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(guest.checkIn).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(guest.checkOut).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{guest.email}</p>
                      <p className="text-muted-foreground">{guest.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
