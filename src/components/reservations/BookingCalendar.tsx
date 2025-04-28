
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(),
    to: undefined,
  });

  const handleSelect = (range: { from: Date; to?: Date }) => {
    setSelectedRange(range);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Booking Calendar</h3>
          <p className="text-sm text-muted-foreground">
            {selectedRange.from && !selectedRange.to && 
              `Selected: ${format(selectedRange.from, "PPP")}`}
            {selectedRange.from && selectedRange.to && 
              `Selected: ${format(selectedRange.from, "PPP")} to ${format(selectedRange.to, "PPP")}`}
          </p>
        </div>
        <div className="p-3">
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
}
