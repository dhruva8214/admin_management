
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { BillingItem } from "@/hooks/useBilling";

export function AddBillingDialog({ onBillingAdded }: { onBillingAdded: (bill: Omit<BillingItem, 'id'>) => void }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    guest_name: "",
    room_number: "",
    amount: "",
    description: "",
    status: "pending" as "paid" | "pending" | "overdue",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBill: Omit<BillingItem, 'id'> = {
      guest_name: formData.guest_name,
      room_number: formData.room_number,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: new Date().toISOString().split('T')[0],
      status: formData.status,
    };
    
    onBillingAdded(newBill);
    
    toast({
      title: "Billing Created",
      description: `${formData.guest_name} has been billed ₹${parseFloat(formData.amount).toLocaleString('en-IN')}.`,
    });
    
    setFormData({
      guest_name: "",
      room_number: "",
      amount: "",
      description: "",
      status: "pending",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Billing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Billing</DialogTitle>
            <DialogDescription>
              Create a new billing entry for a guest.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="guest_name" className="text-right">
                Guest Name
              </Label>
              <Input
                id="guest_name"
                name="guest_name"
                value={formData.guest_name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g., John Doe"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room_number" className="text-right">
                Room Number
              </Label>
              <Input
                id="room_number"
                name="room_number"
                value={formData.room_number}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g., 302"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₹)
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g., 12450.00"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g., Room service"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Billing</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
