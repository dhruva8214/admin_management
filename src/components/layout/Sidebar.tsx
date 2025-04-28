
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Building, 
  CalendarDays, 
  Users, 
  UserRound,
  BarChart2,
  ClipboardList, 
  PackageOpen, 
  Settings,
  Menu,
  X
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Property",
    href: "/property",
    icon: Building,
  },
  {
    title: "Reservations",
    href: "/reservations",
    icon: CalendarDays,
  },
  {
    title: "Guests",
    href: "/guests",
    icon: UserRound,
  },
  {
    title: "Staff",
    href: "/staff",
    icon: Users,
  },
  {
    title: "Finance",
    href: "/finance",
    icon: BarChart2,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: PackageOpen,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: ClipboardList,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "sidebar bg-sidebar flex-shrink-0 flex flex-col border-r border-border transition-all duration-300 h-screen sticky top-0",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="sidebar-header flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-white font-bold text-xl">CommandCenter</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "text-white hover:bg-sidebar-accent", 
            collapsed ? "mx-auto" : ""
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <nav className="sidebar-content flex-1 py-6">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                to={item.href} 
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.href 
                    ? "bg-sidebar-accent text-white" 
                    : "text-gray-400 hover:text-white hover:bg-sidebar-accent/50",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer p-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center", 
          collapsed ? "justify-center" : "justify-start"
        )}>
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            A
          </div>
          {!collapsed && (
            <div className="ml-3 text-white">
              <p className="text-sm font-medium">Admin User</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
