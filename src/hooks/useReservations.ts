
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Reservation {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  room_type: string;
  check_in_date: Date;
  check_out_date: Date;
  guests: number;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
}

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('check_in_date', { ascending: false });

      if (error) throw error;

      setReservations(data.map(item => ({
        id: item.id,
        guest_name: item.guest_name,
        email: item.email,
        phone: item.phone,
        room_type: item.room_type,
        check_in_date: new Date(item.check_in_date),
        check_out_date: new Date(item.check_out_date),
        guests: item.guests,
        status: item.status as 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled'
      })));
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: "Error",
        description: "Failed to load reservations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addReservation = async (reservationData: {
    guest_name: string;
    email: string;
    phone: string;
    room_type: string;
    check_in_date: Date;
    check_out_date: Date;
    guests: number;
  }) => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([{
          id: String(Date.now()),
          guest_name: reservationData.guest_name,
          email: reservationData.email,
          phone: reservationData.phone,
          room_type: reservationData.room_type,
          check_in_date: reservationData.check_in_date.toISOString().split('T')[0],
          check_out_date: reservationData.check_out_date.toISOString().split('T')[0],
          guests: reservationData.guests,
          status: 'confirmed'
        }])
        .select()
        .single();

      if (error) throw error;

      const newReservation: Reservation = {
        id: data.id,
        guest_name: data.guest_name,
        email: data.email,
        phone: data.phone,
        room_type: data.room_type,
        check_in_date: new Date(data.check_in_date),
        check_out_date: new Date(data.check_out_date),
        guests: data.guests,
        status: data.status as 'confirmed'
      };

      setReservations(prev => [newReservation, ...prev]);
      toast({
        title: "Success",
        description: "Reservation added successfully"
      });
    } catch (error) {
      console.error('Error adding reservation:', error);
      toast({
        title: "Error",
        description: "Failed to add reservation",
        variant: "destructive"
      });
    }
  };

  const updateReservationStatus = async (id: string, status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setReservations(prev => 
        prev.map(res => res.id === id ? { ...res, status } : res)
      );

      toast({
        title: "Success",
        description: "Reservation status updated"
      });
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast({
        title: "Error",
        description: "Failed to update reservation",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return {
    reservations,
    loading,
    addReservation,
    updateReservationStatus,
    refetch: fetchReservations
  };
}
