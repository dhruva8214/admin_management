
import { Progress } from "@/components/ui/progress";

interface BudgetProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function BudgetProgressBar({ current, total, label }: BudgetProgressBarProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      )}
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>${current.toLocaleString()}</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </div>
  );
}
