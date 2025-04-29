
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskList from "@/components/dashboard/TaskList";
import { AddTaskDialog } from "@/components/tasks/AddTaskDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, UserRound, ClipboardList, Wrench, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function Tasks() {
  // Initialize with the tasks from TaskList component
  const initialTasks: Task[] = [
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

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<string>("all");
  
  const departmentIcons = {
    housekeeping: ClipboardList,
    maintenance: Wrench,
    frontdesk: UserRound,
  };
  
  const addTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };
  
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
      )
    );
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return task.department === filter;
  });

  return (
    <MainLayout title="Task Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <AddTaskDialog onTaskAdded={addTask} />
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="housekeeping">Housekeeping</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="frontdesk">Front Desk</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">All Tasks ({tasks.length})</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {filteredTasks.map((task) => {
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
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
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
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* These tabs will show filtered content based on the filter value */}
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {/* Task items will be rendered here via the filter */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {/* Task items will be rendered here via the filter */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="housekeeping" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Housekeeping Tasks</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {/* Task items will be rendered here via the filter */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Maintenance Tasks</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {/* Task items will be rendered here via the filter */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="frontdesk" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Front Desk Tasks</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {/* Task items will be rendered here via the filter */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
