
import { 
  Building, 
  CalendarDays, 
  UserRound, 
  DollarSign, 
  Percent, 
  Clock 
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import RoomStatusGrid from "@/components/dashboard/RoomStatusGrid";
import TaskList from "@/components/dashboard/TaskList";

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard">
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
          value="$249.99" 
          icon={<DollarSign size={18} />} 
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Revenue" 
          value="$15,480" 
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
    </MainLayout>
  );
}
