
import { ReactNode } from 'react';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EditableStatCardProps {
  id: string;
  title: string;
  icon: ReactNode;
  dragHandleProps?: any;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function EditableStatCard({ 
  id, 
  title, 
  icon, 
  dragHandleProps,
  isSelected,
  onClick 
}: EditableStatCardProps) {
  
  const getSampleData = (id: string) => {
    switch (id) {
      case 'occupancy':
        return { value: '79%', description: '62 of 78 rooms occupied' };
      case 'reservations':
        return { value: '24', description: 'New bookings in last 24 hours' };
      case 'adr':
        return { value: '₹20,750', description: 'Average daily rate' };
      case 'revenue':
        return { value: '₹12,85,000', description: 'Daily revenue' };
      default:
        return { value: '0', description: 'Sample data' };
    }
  };

  const data = getSampleData(id);

  return (
    <Card 
      className={cn(
        "border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer",
        isSelected && "border-blue-500 bg-blue-50"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        <div className="flex items-center gap-1">
          <div className="text-gray-400">{icon}</div>
          <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
            <GripVertical size={14} className="text-gray-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold text-gray-900 mb-1">{data.value}</div>
        <p className="text-xs text-gray-500">{data.description}</p>
      </CardContent>
    </Card>
  );
}
