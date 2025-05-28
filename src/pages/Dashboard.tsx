
import { useState } from "react";
import { 
  Building, 
  CalendarDays, 
  UserRound, 
  DollarSign, 
  Percent, 
  Clock,
  Edit3,
  Save,
  X
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import RoomStatusGrid from "@/components/dashboard/RoomStatusGrid";
import TaskList from "@/components/dashboard/TaskList";
import DashboardEditor from "@/components/dashboard/DashboardEditor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    setIsEditMode(false);
    toast({
      title: "Dashboard Saved",
      description: "Your dashboard layout has been saved successfully."
    });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    toast({
      title: "Changes Discarded",
      description: "Dashboard changes have been discarded."
    });
  };

  return (
    <MainLayout title="Dashboard">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hotel Overview</h2>
        <div className="flex gap-2">
          {!isEditMode ? (
            <Button 
              onClick={() => setIsEditMode(true)} 
              variant="outline"
              className="gap-2"
            >
              <Edit3 size={16} />
              Edit Dashboard
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={handleSaveChanges} 
                className="gap-2"
              >
                <Save size={16} />
                Save Changes
              </Button>
              <Button 
                onClick={handleCancelEdit} 
                variant="outline"
                className="gap-2"
              >
                <X size={16} />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {isEditMode ? (
        <DashboardEditor onSave={handleSaveChanges} onCancel={handleCancelEdit} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              title="Today's Occupancy" 
              value="79%" 
              icon={<Building size={18} />} 
              trend={{ value: 8, isPositive: true }}
              description="62 of 78 rooms occupied"
            />
            <StatCard 
              title="Reservations" 
              value="24" 
              icon={<CalendarDays size={18} />} 
              trend={{ value: 12, isPositive: true }}
              description="New bookings in last 24 hours"
            />
            <StatCard 
              title="Average Daily Rate" 
              value="₹20,750" 
              icon={<DollarSign size={18} />} 
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard 
              title="Revenue" 
              value="₹12,85,000" 
              icon={<Percent size={18} />} 
              trend={{ value: 2, isPositive: false }}
              description="Daily revenue"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <OccupancyChart />
            </div>
            <div>
              <RevenueChart />
            </div>
          </div>
          
          <div className="mb-6">
            <RoomStatusGrid />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <RecentBookings />
            </div>
            <div>
              <TaskList />
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
