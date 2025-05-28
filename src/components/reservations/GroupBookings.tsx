
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";

export function GroupBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Group Bookings</span>
          <Button size="sm" variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            New Group
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 py-4 border-t border-b flex justify-between items-center">
          <div>
            <div className="font-medium">Johnson Wedding Party</div>
            <div className="text-sm text-muted-foreground">May 10-15, 2025 · 10 Rooms</div>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Active</Badge>
        </div>
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <div className="font-medium">Business Conference</div>
            <div className="text-sm text-muted-foreground">Jun 22-26, 2025 · 15 Rooms</div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>
        </div>
        <div className="p-6 text-center">
          <Button variant="outline" className="w-full">View All Group Bookings</Button>
        </div>
      </CardContent>
    </Card>
  );
}
