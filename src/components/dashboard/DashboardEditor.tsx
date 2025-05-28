
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { 
  Building, 
  CalendarDays, 
  UserRound, 
  DollarSign, 
  Percent,
  Eye,
  EyeOff,
  Settings,
  GripVertical
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import EditableStatCard from "./EditableStatCard";

interface DashboardItem {
  id: string;
  title: string;
  type: 'stat' | 'chart' | 'widget';
  visible: boolean;
  config?: any;
}

const defaultItems: DashboardItem[] = [
  { id: 'occupancy', title: "Today's Occupancy", type: 'stat', visible: true },
  { id: 'reservations', title: 'Reservations', type: 'stat', visible: true },
  { id: 'adr', title: 'Average Daily Rate', type: 'stat', visible: true },
  { id: 'revenue', title: 'Revenue', type: 'stat', visible: true },
  { id: 'occupancy-chart', title: 'Occupancy Chart', type: 'chart', visible: true },
  { id: 'revenue-chart', title: 'Revenue Chart', type: 'chart', visible: true },
  { id: 'room-grid', title: 'Room Status Grid', type: 'widget', visible: true },
  { id: 'recent-bookings', title: 'Recent Bookings', type: 'widget', visible: true },
  { id: 'task-list', title: 'Task List', type: 'widget', visible: true },
];

interface DashboardEditorProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function DashboardEditor({ onSave, onCancel }: DashboardEditorProps) {
  const [items, setItems] = useState<DashboardItem[]>(defaultItems);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const toggleItemVisibility = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'occupancy': return <Building size={16} />;
      case 'reservations': return <CalendarDays size={16} />;
      case 'adr': return <DollarSign size={16} />;
      case 'revenue': return <Percent size={16} />;
      default: return <Settings size={16} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Settings Panel */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings size={18} />
              Dashboard Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Widget Visibility</Label>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getIcon(item.id)}
                      <span className="text-sm">{item.title}</span>
                    </div>
                    <Switch
                      checked={item.visible}
                      onCheckedChange={() => toggleItemVisibility(item.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Preview */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dashboard Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="dashboard">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {/* Stat Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {items.filter(item => item.type === 'stat' && item.visible).map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`${snapshot.isDragging ? 'opacity-80' : ''}`}
                            >
                              <EditableStatCard
                                id={item.id}
                                title={item.title}
                                icon={getIcon(item.id)}
                                dragHandleProps={provided.dragHandleProps}
                                isSelected={selectedItem === item.id}
                                onClick={() => setSelectedItem(item.id)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>

                    {/* Charts and Widgets */}
                    <div className="space-y-4">
                      {items.filter(item => (item.type === 'chart' || item.type === 'widget') && item.visible).map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index + 4}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`${snapshot.isDragging ? 'opacity-80' : ''}`}
                            >
                              <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                                <CardHeader className="flex flex-row items-center justify-between">
                                  <CardTitle className="text-base">{item.title}</CardTitle>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => toggleItemVisibility(item.id)}
                                    >
                                      {item.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </Button>
                                    <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                                      <GripVertical size={16} className="text-gray-400" />
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                                    {item.title} Preview
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
