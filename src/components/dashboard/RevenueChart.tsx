
import { 
  AreaChart, 
  Area, 
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
  { name: 'Week 1', revenue: 42000 },
  { name: 'Week 2', revenue: 38000 },
  { name: 'Week 3', revenue: 45000 },
  { name: 'Week 4', revenue: 52000 },
  { name: 'Week 5', revenue: 48000 },
  { name: 'Week 6', revenue: 55000 },
  { name: 'Week 7', revenue: 62000 },
  { name: 'Week 8', revenue: 58000 },
  { name: 'Week 9', revenue: 65000 },
  { name: 'Week 10', revenue: 70000 },
  { name: 'Week 11', revenue: 68000 },
  { name: 'Week 12', revenue: 75000 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-teal-600">
          Revenue: ${payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// Function to format y-axis ticks
const formatYAxis = (value: number) => {
  if (value >= 1000) {
    return `$${value / 1000}k`;
  }
  return `$${value}`;
};

export default function RevenueChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              tickFormatter={formatYAxis} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#14b8a6" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
