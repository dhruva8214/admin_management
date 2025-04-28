
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

type RoomStatus = 'vacant' | 'occupied' | 'maintenance' | 'cleaning';

interface Room {
  number: string;
  status: RoomStatus;
  type: string;
  guest?: string;
  checkOut?: string;
}

// Sample room data
const rooms: Record<string, Room[]> = {
  "first": [
    { number: "101", status: "vacant", type: "Standard" },
    { number: "102", status: "occupied", type: "Standard", guest: "James Wilson", checkOut: "Apr 29" },
    { number: "103", status: "occupied", type: "Deluxe", guest: "Anna Garcia", checkOut: "Apr 30" },
    { number: "104", status: "cleaning", type: "Standard" },
    { number: "105", status: "occupied", type: "Suite", guest: "David Chen", checkOut: "May 2" },
    { number: "106", status: "vacant", type: "Standard" },
    { number: "107", status: "maintenance", type: "Deluxe" },
    { number: "108", status: "occupied", type: "Standard", guest: "Lisa Johnson", checkOut: "Apr 30" },
    { number: "109", status: "vacant", type: "Standard" },
    { number: "110", status: "occupied", type: "Deluxe", guest: "Michael Brown", checkOut: "May 1" },
  ],
  "second": [
    { number: "201", status: "cleaning", type: "Standard" },
    { number: "202", status: "occupied", type: "Standard", guest: "Emily Lee", checkOut: "May 3" },
    { number: "203", status: "vacant", type: "Deluxe" },
    { number: "204", status: "vacant", type: "Standard" },
    { number: "205", status: "maintenance", type: "Deluxe" },
    { number: "206", status: "occupied", type: "Suite", guest: "Robert Taylor", checkOut: "Apr 29" },
    { number: "207", status: "vacant", type: "Standard" },
    { number: "208", status: "occupied", type: "Standard", guest: "Sofia Martinez", checkOut: "May 2" },
    { number: "209", status: "occupied", type: "Deluxe", guest: "John Davis", checkOut: "Apr 30" },
    { number: "210", status: "vacant", type: "Standard" },
  ],
  "third": [
    { number: "301", status: "occupied", type: "Deluxe", guest: "Thomas White", checkOut: "May 5" },
    { number: "302", status: "cleaning", type: "Standard" },
    { number: "303", status: "occupied", type: "Suite", guest: "Jessica Adams", checkOut: "Apr 29" },
    { number: "304", status: "vacant", type: "Standard" },
    { number: "305", status: "vacant", type: "Deluxe" },
    { number: "306", status: "occupied", type: "Standard", guest: "William Harris", checkOut: "May 1" },
    { number: "307", status: "maintenance", type: "Deluxe" },
    { number: "308", status: "vacant", type: "Standard" },
    { number: "309", status: "occupied", type: "Deluxe", guest: "Olivia Clark", checkOut: "Apr 30" },
    { number: "310", status: "vacant", type: "Standard" },
  ],
  "fourth": [
    { number: "401", status: "vacant", type: "Suite" },
    { number: "402", status: "occupied", type: "Suite", guest: "Daniel Lewis", checkOut: "May 4" },
    { number: "403", status: "vacant", type: "Deluxe" },
    { number: "404", status: "maintenance", type: "Deluxe" },
    { number: "405", status: "occupied", type: "Penthouse", guest: "Emma Miller", checkOut: "May 3" },
    { number: "406", status: "vacant", type: "Suite" },
    { number: "407", status: "occupied", type: "Suite", guest: "Ryan Johnson", checkOut: "Apr 29" },
    { number: "408", status: "cleaning", type: "Deluxe" },
    { number: "409", status: "vacant", type: "Suite" },
    { number: "410", status: "occupied", type: "Penthouse", guest: "Sarah Wilson", checkOut: "May 5" },
  ],
};

const statusText: Record<RoomStatus, string> = {
  vacant: "Vacant",
  occupied: "Occupied",
  maintenance: "Maintenance",
  cleaning: "Cleaning",
};

export default function RoomStatusGrid() {
  const roomCounts = {
    total: Object.values(rooms).flat().length,
    vacant: Object.values(rooms).flat().filter(r => r.status === 'vacant').length,
    occupied: Object.values(rooms).flat().filter(r => r.status === 'occupied').length,
    maintenance: Object.values(rooms).flat().filter(r => r.status === 'maintenance').length,
    cleaning: Object.values(rooms).flat().filter(r => r.status === 'cleaning').length,
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Room Status</CardTitle>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">{roomCounts.vacant} Vacant</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">{roomCounts.occupied} Occupied</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs">{roomCounts.maintenance} Maintenance</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs">{roomCounts.cleaning} Cleaning</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="first">
          <TabsList className="mb-4">
            <TabsTrigger value="first">First Floor</TabsTrigger>
            <TabsTrigger value="second">Second Floor</TabsTrigger>
            <TabsTrigger value="third">Third Floor</TabsTrigger>
            <TabsTrigger value="fourth">Fourth Floor</TabsTrigger>
          </TabsList>
          
          {Object.entries(rooms).map(([floor, floorRooms]) => (
            <TabsContent key={floor} value={floor} className="m-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {floorRooms.map((room) => (
                  <div 
                    key={room.number}
                    className={cn(
                      "border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md",
                      `room-${room.status}`
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-lg">{room.number}</span>
                      <Badge variant="outline" className="text-xs">
                        {room.type}
                      </Badge>
                    </div>
                    <div className="text-xs font-medium mb-1">{statusText[room.status]}</div>
                    {room.guest && (
                      <div className="text-xs truncate" title={room.guest}>
                        {room.guest}
                      </div>
                    )}
                    {room.checkOut && (
                      <div className="text-xs">
                        Check-out: {room.checkOut}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
