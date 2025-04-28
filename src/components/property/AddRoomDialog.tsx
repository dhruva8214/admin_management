
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define proper room type values
type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Penthouse';

interface AddRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRoom: (room: {
    number: string;
    type: RoomType;
    status: 'vacant' | 'occupied' | 'maintenance' | 'cleaning';
  }) => void;
}

export function AddRoomDialog({ open, onOpenChange, onAddRoom }: AddRoomDialogProps) {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('Standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRoom({
      number: roomNumber,
      type: roomType,
      status: 'vacant'
    });
    setRoomNumber('');
    setRoomType('Standard');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="roomNumber" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Room Number
            </label>
            <Input
              id="roomNumber"
              required
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Enter room number"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="roomType" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Room Type
            </label>
            <Select value={roomType} onValueChange={(value: RoomType) => setRoomType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Deluxe">Deluxe</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">Add Room</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
