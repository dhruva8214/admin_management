import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  TooltipProps 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data for the chart
const data = [
  { name: 'Apr 22', occupancy: 65 },
  { name: 'Apr 23', occupancy: 72 },
  { name: 'Apr 24', occupancy: 78 },
  { name: 'Apr 25', occupancy: 82 },
  { name: 'Apr 26', occupancy: 88 },
  { name: 'Apr 27', occupancy: 92 },
  { name: 'Apr 28', occupancy: 85 },
  { name: 'Today', occupancy: 79 },
  { name: 'Apr 30', occupancy: 70, _future: true },
  { name: 'May 1', occupancy: 75, _future: true },
  { name: 'May 2', occupancy: 82, _future: true },
  { name: 'May 3', occupancy: 85, _future: true },
  { name: 'May 4', occupancy: 90, _future: true },
  { name: 'May 5', occupancy: 92, _future: true },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const isFuture = payload[0].payload._future;
    return (
      <div className="bg-white p-3 border rounded shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-primary">
          {isFuture ? 'Forecasted: ' : 'Occupancy: '}
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function OccupancyChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Occupancy Rate</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#e5e7eb' }} 
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#e5e7eb' }} 
              tickFormatter={(value) => `${value}%`} 
              domain={[0, 100]} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="occupancy" 
              radius={[4, 4, 0, 0]} 
              fill="#2563eb"
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-primary rounded-sm mr-1"></div>
            <span>Actual</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-blue-300 rounded-sm mr-1"></div>
            <span>Forecasted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
