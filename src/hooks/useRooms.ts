
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Penthouse';
export type RoomStatus = 'vacant' | 'occupied' | 'maintenance' | 'cleaning';

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  guest_name?: string;
  check_out_date?: string;
}

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('number');

      if (error) throw error;

      setRooms(data.map(room => ({
        id: room.id,
        number: room.number,
        type: room.type as RoomType,
        status: room.status as RoomStatus,
        guest_name: room.guest_name || undefined,
        check_out_date: room.check_out_date || undefined
      })));
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast({
        title: "Error",
        description: "Failed to load rooms",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addRoom = async (roomData: { number: string; type: RoomType; status: RoomStatus }) => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .insert({
          number: roomData.number,
          type: roomData.type,
          status: roomData.status
        })
        .select()
        .single();

      if (error) throw error;

      const newRoom: Room = {
        id: data.id,
        number: data.number,
        type: data.type as RoomType,
        status: data.status as RoomStatus,
        guest_name: data.guest_name || undefined,
        check_out_date: data.check_out_date || undefined
      };

      setRooms(prev => [...prev, newRoom]);
      toast({
        title: "Success",
        description: "Room added successfully"
      });
    } catch (error) {
      console.error('Error adding room:', error);
      toast({
        title: "Error",
        description: "Failed to add room",
        variant: "destructive"
      });
    }
  };

  const updateRoomStatus = async (id: string, status: RoomStatus) => {
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setRooms(prev => 
        prev.map(room => room.id === id ? { ...room, status } : room)
      );

      toast({
        title: "Success",
        description: "Room status updated"
      });
    } catch (error) {
      console.error('Error updating room:', error);
      toast({
        title: "Error",
        description: "Failed to update room status",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    addRoom,
    updateRoomStatus,
    refetch: fetchRooms
  };
}
