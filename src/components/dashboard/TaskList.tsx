
import { Check, UserRound, ClipboardList, Wrench, Clock } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  assignee: string;
  avatar: string;
  department: 'housekeeping' | 'maintenance' | 'frontdesk';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueTime?: string;
}

const tasks: Task[] = [
  {
    id: "T1",
    title: "Clean room 302 after checkout",
    assignee: "Maria Garcia",
    avatar: "MG",
    department: "housekeeping",
    priority: "high",
    completed: false,
    dueTime: "1:00 PM",
  },
  {
    id: "T2",
    title: "Fix shower in room 205",
    assignee: "John Smith",
    avatar: "JS",
    department: "maintenance",
    priority: "medium",
    completed: false,
  },
  {
    id: "T3",
    title: "Restock minibar in room 410",
    assignee: "Emma Wilson",
    avatar: "EW",
    department: "housekeeping",
    priority: "low",
    completed: true,
  },
  {
    id: "T4",
    title: "Prepare welcome package for VIP guest",
    assignee: "Robert Chen",
    avatar: "RC",
    department: "frontdesk",
    priority: "high",
    completed: false,
    dueTime: "2:30 PM",
  },
  {
    id: "T5",
    title: "Replace light bulbs in hallway",
    assignee: "John Smith",
    avatar: "JS",
    department: "maintenance",
    priority: "medium",
    completed: false,
  },
];

const departmentIcons = {
  housekeeping: ClipboardList,
  maintenance: Wrench,
  frontdesk: UserRound,
};

export default function TaskList() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Today's Tasks</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {tasks.map((task) => {
            const DepartmentIcon = departmentIcons[task.department];
            
            return (
              <div 
                key={task.id} 
                className={cn(
                  "flex items-start gap-3 p-3 rounded-md",
                  task.completed ? "bg-muted/50" : "bg-card hover:bg-muted/20"
                )}
              >
                <Checkbox 
                  checked={task.completed} 
                  className="mt-1"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={cn(
                      "font-medium text-sm",
                      task.completed && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </p>
                    
                    {task.priority === "high" && (
                      <Badge 
                        variant="outline" 
                        className="text-red-600 bg-red-50 hover:bg-red-50 border-red-200 text-[10px] px-1 py-0 h-4"
                      >
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DepartmentIcon size={12} />
                      <span className="capitalize">{task.department}</span>
                    </div>
                    
                    {task.dueTime && (
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{task.dueTime}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center text-[10px] font-medium">
                    {task.avatar}
                  </div>
                  
                  {!task.completed && (
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
