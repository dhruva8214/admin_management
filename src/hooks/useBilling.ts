
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BillingItem {
  id: string;
  guest_name: string;
  room_number: string;
  amount: number;
  description: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

export function useBilling() {
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBilling = async () => {
    try {
      const { data, error } = await supabase
        .from('billing')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      setBillingItems(data.map(item => ({
        id: item.id,
        guest_name: item.guest_name,
        room_number: item.room_number,
        amount: parseFloat(item.amount),
        description: item.description,
        date: item.date,
        status: item.status as 'paid' | 'pending' | 'overdue'
      })));
    } catch (error) {
      console.error('Error fetching billing:', error);
      toast({
        title: "Error",
        description: "Failed to load billing data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addBilling = async (billingData: Omit<BillingItem, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('billing')
        .insert([{
          id: `B${Date.now().toString().slice(-5)}`,
          guest_name: billingData.guest_name,
          room_number: billingData.room_number,
          amount: billingData.amount,
          description: billingData.description,
          date: billingData.date,
          status: billingData.status
        }])
        .select()
        .single();

      if (error) throw error;

      const newBilling: BillingItem = {
        id: data.id,
        guest_name: data.guest_name,
        room_number: data.room_number,
        amount: parseFloat(data.amount),
        description: data.description,
        date: data.date,
        status: data.status
      };

      setBillingItems(prev => [newBilling, ...prev]);
      toast({
        title: "Success",
        description: "Billing item added successfully"
      });
    } catch (error) {
      console.error('Error adding billing:', error);
      toast({
        title: "Error",
        description: "Failed to add billing item",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchBilling();
  }, []);

  return {
    billingItems,
    loading,
    addBilling,
    refetch: fetchBilling
  };
}
