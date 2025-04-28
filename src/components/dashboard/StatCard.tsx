
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  description?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  className,
  description 
}: StatCardProps) {
  return (
    <Card className={cn("hotel-stat-card", className)}>
      <CardContent className="p-0 pb-2">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </CardContent>
      {trend && (
        <CardFooter className="p-0 pt-2 border-t">
          <div className={cn(
            "flex items-center text-xs font-medium",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            <span className="ml-1 text-muted-foreground">from last month</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
