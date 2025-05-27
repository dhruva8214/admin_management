
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, ClipboardList, UserRound, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddRoomDialog } from "@/components/property/AddRoomDialog";
import { useRooms, RoomType, RoomStatus } from "@/hooks/useRooms";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  vacant: 'bg-green-100 text-green-800 border-green-200',
  occupied: 'bg-blue-100 text-blue-800 border-blue-200',
  maintenance: 'bg-amber-100 text-amber-800 border-amber-200',
  cleaning: 'bg-purple-100 text-purple-800 border-purple-200',
};

const statusIcons = {
  maintenance: Wrench,
  cleaning: ClipboardList,
  occupied: UserRound,
};

export default function Property() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const { rooms, loading, addRoom } = useRooms();

  const filteredRooms = selectedType === 'all' 
    ? rooms 
    : rooms.filter(room => room.type === selectedType);

  const handleAddRoom = (newRoom: { number: string; type: RoomType; status: RoomStatus }) => {
    addRoom(newRoom);
    setIsAddRoomOpen(false);
  };

  if (loading) {
    return (
      <MainLayout title="Property Management">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Property Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Button 
              variant={selectedType === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedType('all')}
            >
              All Rooms
            </Button>
            {['Standard', 'Deluxe', 'Suite', 'Penthouse'].map(type => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
          <Button onClick={() => setIsAddRoomOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRooms.map((room) => {
            const StatusIcon = statusIcons[room.status as keyof typeof statusIcons];
            
            return (
              <Card key={room.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">Room {room.number}</h3>
                    <Badge variant="outline" className={cn(statusColors[room.status])}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Type: {room.type}</p>
                    {room.guest_name && (
                      <p className="text-sm text-muted-foreground">Guest: {room.guest_name}</p>
                    )}
                    {room.check_out_date && (
                      <p className="text-sm text-muted-foreground">
                        Check-out: {new Date(room.check_out_date).toLocaleDateString()}
                      </p>
                    )}
                    {StatusIcon && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <StatusIcon size={16} />
                        <span>{room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredRooms.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No rooms found. Add your first room to get started!</p>
          </div>
        )}

        <AddRoomDialog
          open={isAddRoomOpen}
          onOpenChange={setIsAddRoomOpen}
          onAddRoom={handleAddRoom}
        />
      </div>
    </MainLayout>
  );
}
